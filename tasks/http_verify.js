/*
 * http-verify
 * https://github.com/skrenek/grunt-http-verify
 *
 * Copyright (c) 2013 Steve Krenek
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var request = require('request'),
      _       = grunt.util._;

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

    if (! url) {
      throw new Error ('`url` is required.');
    }
    if (! conditions ) {
      throw new Error ('`conditions` is required.');
    }

    if (! _.isArray(conditions)) {
      conditions = [ conditions ];
    }

    request(url, function(err, res, body) {
      var conditionsMet = true,
          result = "";

      if (err) {
        conditionsMet = false;
        result = 'Error making verifiction request: ' + JSON.stringify(err);
      } else {

        _.each(conditions, function(condition) {
          switch (condition.type) {
            case 'statusCode':
              var code = condition.value || 200;
              if (res.statusCode !== code) {
                conditionsMet = false;
                result = 'statusCode received ' + res.statusCode;
                grunt.log.error(grunt.template.process("Status code failure.  Expected <%= code %> but received <%= received %>", { code: code, received: res.statusCode }));
              }
              break;
            case 'body':
              var passFail = true;
              if (condition.operator && condition.operator === 'contains') {
                passFail = (res.body.indexOf(condition.value) >= 0);
              } else {
                passFail = (res.body === condition.value);
              }
              if (! passFail) {
                conditionsMet = false;
                result = 'body expected ' + (condition.operator || 'equals') + ' ' + condition.value;
              }
              break;
            case 'header':
              //grunt.log.writeln('headers are ' + JSON.stringify(res.headers));
              var h = res.headers,
                  headerExists = h.hasOwnProperty(condition.nameValue);

              if (! headerExists) {
                conditionsMet = false;
                result = "header " + condition.nameValue + " not found";
              } else {

                if (condition.operator === 'contains') {
                  if (h[condition.nameValue] && h[condition.nameValue].indexOf(condition.value) < 0) {
                    conditionsMet = false;
                    result = "header " + condition.nameValue + " does not contain " + condition.value;
                  } 
                } else if (condition.operator === 'equals') {
                  if (h[condition.nameValue] !== condition.value) {
                  conditionsMet = false;
                  result = "header " + condition.nameValue + " value " + h[condition.nameValue] + " is incorrect";
                }
                }
              }

              break;
          }
        });
      }

      if (task.data.callback) {
        task.data.callback.call(task, conditionsMet ? null : result);
      }
      done(conditionsMet);
    }); // end request
  }); // end task

};
