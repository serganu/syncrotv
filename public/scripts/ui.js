define([
    'backbone',
    'jquery.bootstrap',
    'api',
    'collections/c_videos',
    'models/m_sala',
    'views/user/login',
    'views/user/signup',
    'views/header',
    'views/video/vl_videos',
    'views/sala/sala',
    'views/video/add_video'],
  function (Backbone, Bootstrap, Api, CollectionVideo, SalaModel, UserLogin, UserSignup, HeaderView, VideosView, SalaView, AddVideoView) {

    var Ui = {};

    var loginView = new UserLogin()
    var signupView = new UserSignup()
    var headerView = new HeaderView({el: '#header'})
    var videosView = new VideosView();
    var salaView = new SalaView();
    var addVideoView = new AddVideoView();

    Ui.initialize = function () {
      headerView.setUserData(Backbone.localStorage.getItem('user'));
    };

    Ui.showHome = function () {
        loginView.render();
    };

    Ui.showSignup = function () {
        signupView.render();
    };

    Ui.showSala = function () {
        salaView.render();
    };

    Ui.showSalaId = function (idSala) {
        var sala = new SalaModel({id : idSala});
        sala.fetch({
            success: salaView.render2.bind(salaView),
            error: Ui.errorBackbone
        });
    };

    Ui.showAddVideo = function () {
        addVideoView.render();
    };

    Ui.showVideos = function () {
      var videos = new CollectionVideo();
      videos.fetch({
        success: videosView.render.bind(videosView),
        error: Ui.errorBackbone
      });
    };

    Ui.errorBackbone  = function (data, res) {
        document.getElementById('myModalLabel').innerHTML = "No es pot accedir a la sala de "+data.get('id');
        $('#myModal').modal('show');
        //alert("Error: " + res.responseJSON.error.message);
    };

    Ui.error = function (err, err2) {
        document.getElementById('myModalLabel').innerHTML = err.message;
        $('#myModal').modal('show');
        //alert("Error: " + err.message);
    };

    Ui.errorAPI = function (res) {
        document.getElementById('myModalLabel').innerHTML = err.message;
        alert("Error: " + res.responseJSON.error.message);
    };

    Backbone.on('api:login:error', function (res) {
        Ui.error(res.responseJSON.error);
    });

    Backbone.on('api:signup:error', function (res) {
        Ui.error(res.responseJSON.error);
    });

    return Ui;
  });