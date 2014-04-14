module.exports = {
    options: {
        script: '<%= dir.script  %>/server.js',
        port: '<%= server.port %>'
    },
    dev: {
        options: {
            livereload: true
        }
    },
    devie: {
        options: {
            //livereload: true
        }
    },
    prod: {
        options: {
            background: false
        }
    }
};
