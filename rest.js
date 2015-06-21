module.exports = function (app) {

  var jwt = require('express-jwt')({secret: app.secret});

  var Usuaris = require('./routes/r_usuari')(app);
  var Videos = require('./routes/r_videos')(app);
  var Sala = require('./routes/r_sala')(app);
  var util = require('./util');

  // User login
  app.post('/api/usuaris/login', Usuaris.login);
  // User registration
  app.post('/api/usuaris', Usuaris.create);
  // Usuari set Sala
  app.post('/api/usuaris/self/sala', jwt, Usuaris.entrarSala, util.sendAuthError);

  // Only if User logged in
  app.get('/api/videos/:id', jwt, Videos.getById);
  // Only if User logged in
  app.get('/api/users/self/videos', jwt, Videos.getVideos, util.sendAuthError);
  // Only if User logged in
  app.post('/api/users/self/videos', jwt, Videos.create,  util.sendAuthError);

  //Set Sala Video
  app.post('/api/sala/video', jwt, Sala.addVideo, util.sendAuthError);
  //Get Sala
  app.get('/api/sala/:id', jwt, Sala.getByEmail);

}