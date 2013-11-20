/*
 * http-verify
 * https://github.com/skrenek/grunt-http-verify
 *
 * Copyright (c) 2013 Steve Krenek
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var httpVerify = require('http-verify'),
      _          = grunt.util._;

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('http_verify', 'Send an HTTP request and verify part(s) of the response.', function() {



    // Merge task-specific and/or target-specific options with these defaults.
    var task = this, 
        done = this.async(),
        options = this.options({
      
        }),
        url = this.data.url,
        conditions = this.data.conditions;

    httpVerify.verify({
      url: this.data.url,
      conditions: this.data.conditions
    }, function(err) {
      var conditionsMet = (! err);
      if (task.data.callback) {
        task.data.callback.call(task, conditionsMet ? null : err);
      }
      done();
    });
  }); // end task

};
