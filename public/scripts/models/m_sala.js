/**
 * Created by Raul on 29/05/2015.
 */

define(['backbone'],
    function(Backbone){
        var SalaModel = Backbone.Model.extend({
            urlRoot: "/api/sala"
        });

        return SalaModel;
    });