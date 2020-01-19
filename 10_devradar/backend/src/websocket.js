const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;

// Precisamos armazenar todas as conexões
// Para app de test, salvar na memória do node. Mas poderia ser em  outro banco de dados.
const connection = [];

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connection.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });
  });
};


exports.findConnections = (coordinates, techs) => {
  return connection.filter(connection => {
    // Comparo coordenadas do novo dev com as coordenadas de cada conexão do websocket
    // Some = retorna true caso um item seja verdadeiro
    return calculateDistance(coordinates, connection.coordinates) < 10
      && connection.techs.some(item => techs.includes(item));
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}