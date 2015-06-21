/**
 * Created by Raul on 29/05/2015.
 */
define([
    'backbone',
    'models/m_sala'
], function(Backbone, SalaModel){
    var SalaCollection = Backbone.Collection.extend({
        model: SalaModel,
        url: "/api/sala"
    });

    return SalaCollection;
});