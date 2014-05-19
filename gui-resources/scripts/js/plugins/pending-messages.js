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
                    //retain the blog view for future reference
                    blogView = view;
                    //add the markup for pending messages
                    dust.renderThemed('themeBase/plugins/pending-items-message', {}, function(err, out) {
                        view.$('[data-gimme="posts.pending-message-placeholder"]').html(out);
                    });
                });
                utils.dispatcher.once('initialize.posts-view', function(view) {
                    //add the click event handler for the new items message
                    blogView.$('[data-gimme="posts.pending-message"]').on('click', function(){
                        view.renderPending();
                    })
                });
                //when the pending posts are rendered remove the new posts link
                utils.dispatcher.on('rendered-pending.posts-view', function(view) {
                    blogView.$('[data-gimme="posts.pending-message"]').html('').css('display', 'none');
                });
                //when new pending posts are added, show the appropriate message
                utils.dispatcher.on('add-pending.posts-view', function(view) {
                    var message = {}, pending = view.countPending();
                    message = pending === 1 ? '1 new post' : pending + ' new posts';
                    blogView.$('[data-gimme="posts.pending-message"]').html(message.toString()).css('display', 'inline');
                });
            };
            return plugins.pendingMessages;
        }
    });
