'use strict';
define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            name: 'My Blog'
        }
    });
});