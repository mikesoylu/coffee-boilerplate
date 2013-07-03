var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point) + "/out"); // set server path to out
};

module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      compile: {
        expand: true,
        cwd: 'src',
        src: '*.coffee',
        dest: 'out',
        ext: '.js'
      }
    },

    livereload: {
      port: 35729 // Default livereload listening port.
    },

    connect: {
      livereload: {
        options: {
          port: 9000,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },

    regarde: {
      coffee: {
        files:['src/*.coffee'],
        tasks:['coffee']
      },

      reload: {
        files:['out/*'],
        tasks:['livereload']
      }
    }
  });

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);

};
