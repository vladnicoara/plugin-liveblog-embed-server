'use strict';
define([
    'plugins',
    'lib/utils',
    'dust',
    'lib/helpers/visibility-toggle',
    'tmpl!themeBase/item/base',
    'tmpl!themeBase/plugins/pending-items-message'
    ], function (plugins, utils, dust, visibilityToggle) {
        if (utils.isClient) {
            plugins.pendingMessages = function (config) {
                var blogView = {};
                utils.dispatcher.on('initialize.blog-view', function(view) {
                    blogView = view;
                    dust.renderThemed('themeBase/plugins/pending-items-message', {}, function(err, out) {
                        view.$('[data-gimme="posts.pending-message-placeholder"]').html(out);
                    });
                });
                utils.dispatcher.once('initialize.posts-view', function(view) {
                    blogView.$('[data-gimme="posts.pending-message"]').on('click', function(){
                        view.renderPending();
                    })
                });
                utils.dispatcher.on('rendered-pending.posts-view', function(view) {
                    blogView.$('[data-gimme="posts.pending-message"]').html('0 messages');
                });
                utils.dispatcher.on('add-pending.posts-view', function(view) {
                    var message = {}, pending = view.countPending();
                    message = pending === 1 ? '1 new message' : pending + ' new messages';
                    blogView.$('[data-gimme="posts.pending-message"]').html(message.toString());
                });
            };
            return plugins.pendingMessages;
        }
    });
