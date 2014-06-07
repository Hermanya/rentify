module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    watch:
      options:
        livereload: true
      coffeeAssets:
        files: '_scripts/*.coffee'
        tasks: ['coffee:compileAssets']
      coffeeServer:
        files: 'server.coffee'
        tasks: ['coffee:compileServer']
      coffeeRoutes:
        files: '_routes/*.coffee'
        tasks: ['coffee:compile']
      css:
        files: 'public/styles/*.css'
        tasks: ['autoprefixer']
      express:
        files:  [ '**/*.js' ]
        tasks:  [ 'express:dev' ]
        options:
          spawn: false
    coffeelint:
      app: ['*.coffee']
      options:
        configFile: 'coffeelint.json'
    coffee:
      compileAssets:
        expand: true
        flatten: true
        cwd: '_scripts'
        src: ['*.coffee']
        dest: 'public/scripts'
        ext: '.js'
      compileRoutes:
        options:
          bare: true
        # cwd: '_routes'
        # src: ['*.coffee']
        # dest: 'routes'
        # ext: '.js'
        files:
          'routes/get.js':'_routes/get.coffee'
      compileServer:
        files:
          'server.js': 'server.coffee'
    express:
      dev:
        options:
          script: 'server.js'
    autoprefixer:
      sourcemap:
        options:
          map: true
        src: 'public/styles/*.css'
  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-express-server'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.registerTask 'default',
    ['coffee', 'autoprefixer','express','watch']
