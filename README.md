grunt-svg-data-urls
===================

Convert SVGs to data urls and uses templates to style output file. Grunt Plugin.

Template allows you to convert the results object and output the results to the destination file. 

How to use

```

svgDataUrls: {

  compile: {
        
    files: {
      src: [
        "test/resources/*.svg"
      ],
      dest: "tmp/test.coffee"
    },

    template: function(results) {
      var fileContents = ""

      results.forEach(function(item) {
        fileContents += item.name +':' + item.dataUrl + ':' + item.filePath
      })

      return fileContents
    }

  }

}

```
