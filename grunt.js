/*global module*/
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      all: ['./grunt.js', './src/**/*.js']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        nonew: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        eqnull: true,
        browser: true,
        strict: true,
        boss: false
      }
    },
    concat: {
      dist: {
        src: ['src/tinyerror.js'],
        dest: 'dist/tinyerror.js'
      },
      test: {
        src: ['src/tinyerror.js', 'test/testling-src.js'],
        dest: 'test/testling-tinyerror.js'
      }
    }
  });
  grunt.registerTask('default', 'lint concat');
};
