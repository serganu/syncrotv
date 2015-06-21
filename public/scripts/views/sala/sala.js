/**
 * Created by Raul on 15/05/2015.
 */


define([
    'jquery',
    'underscore',
    'backbone',
    'api',
    'text!/templates/sala/sala.html',
    'socketio'
], function($, _, Backbone, Api, t_sala, io) {
    var $content = $('#content');

    var socket = io.connect('http://127.0.0.1:3000');
    var player;
    var salaView;
    var youtube_api_init;

    window.onYouTubePlayerAPIReady = function (){
        player = new YT.Player('videoiframe', {
            events: {
                // call this function when player is ready to use
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    function onPlayerStateChange(event) {
        if (event.data == 1){
            salaView.playSala(player.getCurrentTime());
        }
        else if(event.data == 2){
            salaView.pauseSala();
        }
        else if(event.data == 3){
            salaView.pauseSala();
        }
    }

    function onPlayerReady(event) {
        player.playVideo();
        player.pauseVideo();
    }

    var Sala = Backbone.View.extend({
        className: 'container',
        template: _.template(t_sala),

        initialize: function () {
            socket.on("play",function(time){
                player.seekTo(time);
                player.playVideo();
            });
            socket.on("pause",function(txt){
                if(player.getPlayerState() != 3) {
                    player.pauseVideo();
                }
            });
            socket.on("msg",function(data){
                //data = JSON.parse(data);
                var msg = $("#messages");
                function getDateTime() {
                    var now     = new Date();
                    var hour    = now.getHours();
                    var minute  = now.getMinutes();
                    var second  = now.getSeconds();

                    if(hour.toString().length == 1) {
                        var hour = '0'+hour;
                    }
                    if(minute.toString().length == 1) {
                        var minute = '0'+minute;
                    }
                    if(second.toString().length == 1) {
                        var second = '0'+second;
                    }
                    var dateTime = ' ('+hour+':'+minute+':'+second+')';
                    return dateTime;
                }
                msg.append("<li><strong><span class='text-success'>" + data.user + getDateTime() +"</span></strong> : " + data.txt + "</li>");
            });

            salaView = this;
        },

        events: {
            'click #btn-play': 'playSala',
            'click #btn-pause': 'prova',
            'click #btn-sendMsg': 'sendMsg'
        },
        connect: function() {
            var data = { /*creating a Js ojbect to be sent to the server*/
                user: Backbone.localStorage.getItem('user'),
                sala: document.getElementById('nomSala').innerHTML
            }
            socket.emit("login",(JSON.stringify(data)));
        },
        playSala: function(playerTime) {
            var data= {
                user: Backbone.localStorage.getItem('user').username,
                time: playerTime
            }
            socket.emit("play", (JSON.stringify(data)));
        },
        pauseSala: function() {
            socket.emit("pause",Backbone.localStorage.getItem('user').username);
        },
        sendMsg: function(){
            var text = $("#txtMsg");

            var data = {
                user: Backbone.localStorage.getItem('user').username,
                txt: text.val()
            }
            text.val('');
            socket.emit("msg", (JSON.stringify(data)));
        },

        prova: function(){
           player.setFullSreen(1);
        },
        render: function() {
            $content.empty();
            this.$el.html(this.template());
            this.delegateEvents();
            $content.append(this.$el);
            return this;
        },
        render2: function(sala) {
            if(!sala.get('Video'))
            {
                document.getElementById('myModalLabel').innerHTML = "Aquesta sala no té video!";
                $('#myModal').modal('show');
                //alert("Aquesta sala no te video!");
            }
            else{
                $content.empty();
                this.$el.html(_.template(t_sala, {sala: sala}));
                this.delegateEvents();
                $content.append(this.$el);

                //Api youtube
                if (typeof youtube_api_init != 'undefined') {
                    onYouTubePlayerAPIReady();
                }
                else
                {
                    var tag = document.createElement('script');
                    tag.src = "//www.youtube.com/player_api";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }
                youtube_api_init = 1;

                //Connect WebSocket
                this.connect();

                return this;
            }
        }

    });

    return Sala;
});