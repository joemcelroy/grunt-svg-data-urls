(function() {
  var SVGDataUrls, async, fs,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  async = require('async');

  fs = require('fs');

  SVGDataUrls = (function() {
    function SVGDataUrls(grunt, options) {
      this.grunt = grunt;
      this.options = options;
      this.resultsHandler = __bind(this.resultsHandler, this);
      this.handleFile = __bind(this.handleFile, this);
      if (this.validConfig === false) {
        this.grunt.fatal("Requires svgs and a template");
      }
      this.files = this.grunt.file.expand(this.options.files.src);
      this.convertSVGSToArray();
    }

    SVGDataUrls.prototype.validConfig = function() {
      var _ref;
      return !((_ref = this.options.files) != null ? _ref.src : void 0) || !this.options.template;
    };

    SVGDataUrls.prototype.convertSVGSToArray = function() {
      return async.map(this.files, this.handleFile, this.resultsHandler);
    };

    SVGDataUrls.prototype.encodeFile = function(filePath) {
      var fileData, prefix;
      prefix = "data:image/svg+xml;charset=US-ASCII,";
      fileData = fs.readFileSync(filePath);
      return prefix + encodeURIComponent(fileData.toString('utf-8').replace(/[\n\r]/gmi, "").replace(/\t/gmi, " ").replace(/<\!\-\-(.*(?=\-\->))\-\->/gmi, "").replace(/'/gmi, "\\i"));
    };

    SVGDataUrls.prototype.handleFile = function(filePath, cb) {
      var dataUrl, name;
      dataUrl = this.encodeFile(filePath);
      name = /([^/]+).svg$/.exec(filePath)[1];
      
      fileData = fs.readFileSync(filePath);
      fileData = fileData.toString('utf-8');

      var widthReg = new RegExp('width="([0-9]+)px"', 'im');
      var width = fileData.match(widthReg)[1];

      var heightReg = new RegExp('height="([0-9]+)px"', 'im');
      var height = fileData.match(heightReg)[1];
      
      return cb(false, {
        name: name,
        dataUrl: dataUrl,
        filePath: filePath,
        width: width,
        height: height
      });
    };

    SVGDataUrls.prototype.resultsHandler = function(err, results) {
      var fileResults;
      if (err) {
        return this.grunt.fatal("error ocurred", err);
      }
      fileResults = this.options.template(results);
      return this.grunt.file.write(this.options.files.dest, fileResults);
    };

    return SVGDataUrls;

  })();

  module.exports = function(grunt, options) {
    return new SVGDataUrls(grunt, options);
  };

}).call(this);
