'use strict';

// Shared functions and variables for collections and models.
define({

    // Params to be added automatically to the request
    // headers: added to request header
    // data: added as url parameters
    syncParams: {
        headers: {},
        data: {}
    },

    // The function to be called for polling
    poller: function(options) {
        this.fetch(options);
    }
});
