/* global module */
module.exports = function(grunt) {

    'use strict';

    // Grunt configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        source: {
            css: [
                'lib/sass/*.scss'
            ],
            js: [
                'lib/js/jquery*.js',
                'lib/js/*.js'
            ]
        },

        watch: {
            css: {
                files: '<%= source.css %>',
                tasks: ['compass:dist']
            },
            js: {
                files: '<%= source.js %>',
                tasks: ['uglify:dist']
            }
        },

        compass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                }
            }
        },

        uglify: {
            options: {},
            dist: {
                files: {
                    'public/js/script.js': '<%= source.js %>'
                }
            }
        }

    });

    // Load the grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register task(s).
    grunt.registerTask('build',   ['compass', 'uglify']);
    grunt.registerTask('compile', ['build']);
    grunt.registerTask('default', ['compile','watch']);

};