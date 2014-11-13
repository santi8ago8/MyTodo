module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Create a live reload server instance
    var lrserver = require('tiny-lr')();

    // Listen on port 35729
    lrserver.listen(35729, function (err) {
        console.log('LR Server Started');
    });

    // Then later trigger files or POST to localhost:35729/changed
    //lrserver.changed({body:{files:['public/css/changed.css']}});

    grunt.initConfig({
        nodemon: {
            dev: {
                script: 'bin/www',
                options: {
                    callback: function (nodemon) {

                        nodemon.on('config:update', function () {
                            // Delay before server listens on port

                            //update
                        });

                        nodemon.on('restart', function () {

                        });
                    }
                }
            }
        },
        watch: {
            scripts: {
                files: ['./app.js'],
                options: {
                    // Start a live reload server on the default port 35729
                    livereload: 35729,
                }
            }
        }
    });

    grunt.event.on('watch', function (action, filepath, target) {
        console.log(target + ': ' + filepath + ' has ' + action);
    });




    grunt.registerTask('serve', ['nodemon', 'watch']);

}