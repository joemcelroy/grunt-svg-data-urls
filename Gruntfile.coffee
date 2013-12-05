module.exports = (grunt) ->

  grunt.initConfig

    coffee:
      compile:
        files: 
          'lib/index.js':'src/index.coffee'

    
    svgDataUrls:
      
      test:
        
        files:
          src: [
            "test/resources/*.svg"
          ]
          dest: "tmp/test.coffee"

        template: (results) ->
          fileContents = ""
          fileContents += "#{item.name}:'#{item.dataUrl}'" for item in results

          return fileContents

  grunt.loadTasks('tasks')
  grunt.loadNpmTasks('grunt-contrib-coffee')

  grunt.registerTask "default", [
    'coffee'
    'svgDataUrls'
  ]


