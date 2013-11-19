/*
 * http-verify
 * https://github.com/skrenek/grunt-http-verify
 *
 * Copyright (c) 2013 Steve Krenek
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    http_verify: {
      statusCode: {
        url: 'http://www.gruntjs.com',
        conditions: [
          {
            type: 'statusCode'
          }
        ],
        callback: function(err){
          grunt.file.write('tmp/statusCode', (!err)  ? 200 : err);
        }
      },

      statusCodeNotFound: {
        url: 'http://www.gruntjs.com/notfound',
        conditions: {
          type: 'statusCode',
          value: 404
        },
        callback: function(err) {
          grunt.file.write('tmp/statusCodeNotFound', (!err) ? 404 : err);
        }
      },

      statusCodeFailure: {
        url: 'http://www.gruntjs.com/notfound',
        conditions: {
          type: 'statusCode',
          value: 200
        },
        callback: function(err) {
          grunt.file.write('tmp/statusCodeFailure', (!err) ? 200 : err);
        }
      },

      bodyContains: {
        url: 'http://www.gruntjs.com',
        conditions: {
          type: 'body',
          operator: 'contains',
          value: 'grunt'
        },
        callback: function(err) {
          grunt.file.write('tmp/bodyContains', (!err) ? 'true' : err);
        }
      },

      headerExists: {
        url: 'http://www.gruntjs.com',
        conditions: {
          type: 'header',
          operator: 'exists',
          nameValue: 'date'
        },
        callback: function(err) {
          grunt.file.write('tmp/headerExists', (!err) ? 'true' : err);
        }
      },

      headerContains: {
        url: 'http://www.gruntjs.com',
        conditions: [
          {
            type: 'header',
            operator: 'contains',
            nameValue: 'date',
            value: 'GMT'
          }
        ],
        callback: function(err) {
          grunt.file.write('tmp/headerContains', (!err) ? 'true' : err);
        }
      },

      headerEquals: {
        url: 'http://www.gruntjs.com',
        conditions: {
          type: 'header',
          operator: 'equals',
          nameValue: 'connection',
          value: 'keep-alive'
        },
        callback: function(err) {
          grunt.file.write('tmp/headerEquals', (!err) ? 'true' : err);
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'http_verify', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
