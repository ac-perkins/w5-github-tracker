module.exports = function(grunt) {

    grunt.initConfig({

        jshint: {
            options: {
                jshintrc: true
        },
            all: [ 'js/*.js' ]
        },

        // sass: {               // task name
        //     project: {        // target name
        //         files: {
        //             'dist/stylesheets/screen.css': 'sass/screen.scss'
        //         }
        //     }
        // },

        compass: {
            project: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'dist/stylesheets',
                    environment: 'production'
                }
            }
        },

        watch: {
            js: {
                files: [ 'js/*.js' ],
                tasks: [ 'js-build' ]
            },
            compass: {
                files: [ 'sass/**/*.scss' ],
                tasks: [ 'css-build' ]
            }
        },

        clean: [ 'dist/' ],

        copy: {
            html: {
                expand: true,
                src: ['index.html'],
                dest: 'dist/'
            },
            vendorjs: {
                expland: true,
                src: ['js/vendor/jquery/dist/jquery.js'],
                dest: 'dist/js/vendor/',
                cwd: 'js/vendor/jquery/dist/'
            }
        },

        concat: {
            options: {
                separator: ';',
                sourceMap: true
            },
            js: {
                src: [ 'js/*.js' ],
                dest: 'dist/js/app.js',
            },
        },

        mocha: {
            all: {
                options: {
                urls: ['http://localhost:8888/test/index.html']
                }
            }
        },

        connect: {
            server: {
              options: {
                  port: 8888,
                  base: '.'
              }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('test', ['connect', 'mocha']);
    grunt.registerTask('js-build', ['jshint', 'concat:js']);
    grunt.registerTask('css-build', ['compass']);
    grunt.registerTask('default', ['clean', 'copy', 'js-build', 'css-build']);
};
