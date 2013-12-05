var svgDataUrls = require("../lib");

module.exports = function (grunt) {
  grunt.registerMultiTask('svgDataUrls', 'Turns SVGs into data urls', function() {
    svgDataUrls(grunt, this.data)
  })
}