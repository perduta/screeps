'use strict';

module.exports = function(grunt) {

    let secrets = require('./.secrets.json');

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        screeps: {
            options: {
                email: secrets.email,
                password: secrets.password,
                branch: 'master',
                ptr: true,
//                http_proxy: 'http://10.144.1.10:8080',
            },
            dist: {
                src: ['dist/*.js'],
            },
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
            },
            files: {
                src: ['src/*'],
            },
        },

        copy: {
          screeps: {
            files: [{
              expand: true,
              cwd: 'src/',
              src: '**',
              dest: 'dist/',
              filter: 'isFile',
              rename: function (dest, src) { return dest + src.replace(/\//g, '.'); }
            }]
          },
        },

        clean: {
          'dist': ['dist']
        },

        watch: {
            files: ['src/**'],
            tasks: ['default'],
        },
    });

    grunt.registerTask('default', ['clean', 'copy', 'screeps']);
};
