'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.http_verify = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  statusCode: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/statusCode');
    test.equal(actual, 200, 'expected 200, received ' + actual);

    test.done();
  },

  statusCodeNotFound: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/statusCodeNotFound');
    test.equal(actual, 404, 'expected 404, received ' + actual);
    test.done();
  },

  statusCodeFailure: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/statusCodeFailure');
    test.equal(actual, 'statusCode received 404', 'expected 404, received ' + actual);
    test.done();
  },

  bodyContains: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/bodyContains');
    test.equal(actual, 'true', 'expected true, found ' + actual);
    test.done();
  },

  headerExists: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/headerExists');
    test.equal(actual, 'true', 'expected true, found ' + actual);
    test.done();
  },

  headerContains: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/headerContains');
    test.equal(actual, 'true', 'expected true, found ' + actual);
    test.done();
  },

  headerEquals: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/headerEquals');
    test.equal(actual, 'true', 'expected true, found ' + actual);
    test.done();
  }
};
