'use strict';

define(['backbone', 'underscore'], function(Backbone, _) {
    var obj = {};

    // set to true if the working script is on the client.
    obj.isClient = ((typeof window !== 'undefined' &&
                    window.navigator && window.document) ||
                    typeof importScripts !== 'undefined');

    // set to true if the working script is on the server.
    obj.isServer = (typeof process !== 'undefined' &&
                   process.versions &&
                   !!process.versions.node);

    // set the dispatcher form Backbone events.
    obj.dispatcher = _.extend({}, Backbone.Events);

    return obj;
});
