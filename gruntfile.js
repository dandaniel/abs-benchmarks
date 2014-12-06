module.exports = function(grunt) {
  /*
   * Time grunt execution
   */
  require('time-grunt')(grunt);

  /*
   * JIT Grunt will automatically load other npm tasks
   */
  require('jit-grunt')(grunt);

  /*
   * Configuration
   */
  var gruntConfig = [];

  var gruntTasks = {
    //////////////
    pkg: grunt.file.readJSON('package.json'),
    /*
     * Placed at the top of the compiled source files.
     */
    meta: {
      banner:
        '/*\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.repository.url %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
        ' */\n'
    },
    shell: {
      build_benchmark: {
        command: './node_modules/angular-benchpress/bin/benchpress build'
      },
      run_benchmark: {
        command: './node_modules/angular-benchpress/bin/benchpress run'
      },
      bench_chrome: {
        command: './node_modules/angular-benchpress/bin/benchpress launch_chrome'
      }
    }
  };

  /////////////////
  grunt.initConfig(
    grunt.util._.extend(gruntTasks, gruntConfig)
  );

  /*
   * Tasks
   */
  grunt.registerTask('default', []);
  grunt.registerTask('benchmark', [
    'shell:build_benchmark',
    'shell:run_benchmark'
  ]);
  grunt.registerTask('chrome', ['shell:bench_chrome']);
};