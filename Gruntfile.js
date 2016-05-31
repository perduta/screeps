'use strict';

module.exports = function(grunt) {

    let secrets = require('./.secrets.json');

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        screeps: {
            options: {
                email: secrets.email,
                password: secrets.password,
                branch: 'master',
                ptr: true,
                http_proxy: 'http://10.144.1.10:8080',
            },
            dist: {
                src: ['src/*.js'],
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

        watch: {
            files: ['src/*'],
            tasks: ['jshint', 'screeps'],
        },
    });

    grunt.registerTask('default', ['jshint', 'screeps']);
};
