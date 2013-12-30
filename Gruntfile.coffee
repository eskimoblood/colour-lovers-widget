module.exports = (grunt) ->
  grunt.initConfig
    'gh-pages':
      options:
        base: 'dist'
      src: ['**']
    cssmin:
      minify:
        files:
          'dist/colourloversWidget.min.css': ['src/colourloversWidget.css']
    uglify:
      minify:
        files:
          'dist/colourloversWidget.min.js': ['src/colourloversWidget.js']

  grunt.loadNpmTasks 'grunt-gh-pages'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'