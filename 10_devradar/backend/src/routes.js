const { Router } = require('express')
const axios = require('axios');

const Dev = require('./models/Dev');

const router = Router();

router.post('/devs', async (req, res) => {
  const { github_username, techs, latitude, longitude } = req.body;

  const response = await axios.get(`https://api.github.com/users/${github_username}`)

  // name = login. Se name não existir, por padrão pegue o valor de login
  const { name = login, avatar_url, bio } = response.data;

  // Split retorna array com espaços, sem virgulas
  // Map = para cada tecnologia faço trim, que remove espaçamentos antes e depois de uma string
  const techsArray = techs.split(',').map(tech => tech.trim());

  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  }
  const dev = await Dev.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray,
    location,
  });

  return res.json(dev)
});


module.exports = router;