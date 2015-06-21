define(['jquery', 'promises'], function ($, P) {
  var Api = {};

  Api.login = function (data) {
    var df = P.defer();
    $.ajax({
      url: '/api/usuaris/login',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data),
      processData: false,
      success: df.resolve,
      error: df.reject
    });
    return df.promise;
  }

  Api.signup = function (data) {
    var df = P.defer();
    $.ajax({
      url: '/api/usuaris',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data),
      processData: false,
      success: df.resolve,
      error: df.reject
    });
    return df.promise;
  }


    Api.createVideos = function (data) {
        var df = P.defer();
        var user = Backbone.localStorage.getItem('user');
        if (!user) { return df.reject(new Error("API call needs user authenticated")) }
        var token = user.jwt;
        $.ajax({
            url: '/api/users/self/videos',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            processData: false,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: df.resolve,
            error: df.reject
        });
        return df.promise;
    }

    Api.getVideos = function () {
        var df = P.defer();
        var user = Backbone.localStorage.getItem('user');
        if (!user) { return df.reject(new Error("API call needs user authenticated")) }
        var token = user.jwt;
        $.ajax({
            url: '/api/users/self/videos',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            processData: false,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: df.resolve,
            error: df.reject
        });
        return df.promise;
    }

    Api.setVideoSala = function (data) {
        var df = P.defer();
        var user = Backbone.localStorage.getItem('user');
        if (!user) { return df.reject(new Error("API call needs user authenticated")) }
        var token = user.jwt;
        $.ajax({
            url: '/api/sala/video',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            processData: false,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: df.resolve,
            error: df.reject
        });
        return df.promise;
    }

  return Api;
});
