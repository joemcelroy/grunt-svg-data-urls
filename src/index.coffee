async = require('async')
fs = require( 'fs' )

class SVGDataUrls

  constructor:(@grunt, @options) ->
    if @validConfig is false
      @grunt.fatal("Requires svgs and a template")

    @files = @grunt.file.expand(@options.files.src)
    @convertSVGSToArray()

  validConfig: ->
    !@options.files?.src or !@options.template

  convertSVGSToArray: ->    
    async.map @files, @handleFile, @resultsHandler

  encodeFile: (filePath) ->
    prefix = "data:image/svg+xml;charset=US-ASCII,";
    fileData = fs.readFileSync filePath 

    return prefix + encodeURIComponent( fileData.toString('utf-8')
      .replace( /[\n\r]/gmi, "" )
      .replace( /\t/gmi, " " )
      #strip comments
      .replace(/<\!\-\-(.*(?=\-\->))\-\->/gmi, "")
      #replace
      .replace(/'/gmi, "\\i") )

  handleFile: (filePath, cb) =>
    dataUrl = @encodeFile(filePath) 
    name = /([^/]+).svg$/.exec(filePath)[1]

    cb false, {
      name 
      dataUrl
      filePath
    }

  resultsHandler: (err,results) =>
    if err
      return @grunt.fatal("error ocurred", err)

    fileResults = @options.template(results)
    @grunt.file.write(@options.files.dest, fileResults)


module.exports = (grunt, options) -> new SVGDataUrls(grunt, options)








