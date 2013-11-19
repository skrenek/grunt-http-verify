# http-verify

> Send an HTTP request and verify part(s) of the response.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install http-verify --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('http-verify');
```

## The "http_verify" task

### Overview
In your project's Gruntfile, add a section named `http_verify` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  http_verify: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      url: 'url to verify',
      conditions: [{
        type: 'statusCode|body|header',
        operator: 'contains|equals|exists', // Depends on which type.  See below.
        value: 'value to test for',
        nameValue: 'used for type header only.  insert the name of the header to test'
      }],
      callback: function(err) {
        if (!err) {
          // verification successful
        }
      }
    },
  },
})
```
### Usage Examples

#### Status Code
In this example, the site gruntjs.com is verified to return a 200 status code.
```js
http_verify: {
  statusCode: {
    url: 'http://www.gruntjs.com',
    conditions: [
      {
        type: 'statusCode'
      }
    ],
    callback: function(err){
      grunt.log.writeln((!err) ? 'Success!' : err);
    }
  }
}
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
