const axios = require('axios');

const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(`https://api.github.com/users/${github_username}`)

      // name = login. Se name não existir, por padrão pegue o valor de login
      const { name = login, avatar_url, bio } = response.data;

      // Split retorna array com espaços, sem virgulas
      // Map = para cada tecnologia faço trim, que remove espaçamentos antes e depois de uma string
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      // Filtrar as conexões e procurar as que satisfazem as condições de geolocalização e de tecnologias
      // Filtrar as que estão no máximo 10 km de distancia e que novo dev tenha uma das tecnologias
      // Se um dev é criado, devo avisar o mobile

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      );

      console.log(sendSocketMessageTo);

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev)
  }
}
