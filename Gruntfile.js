module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			options : {
				banner : '/*! Uglyfied <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
			my_target : {
				files : {
					'build/quasar.min.js' : ['build/quasar.js']
				}
			}
		},
		cssmin : {
			add_banner : {
				options : {
					banner : '/* Minified <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
				},
				files : {
					'build/quasar.min.css' : ['src/**/*.css']
				}
			}
		},
		watch : {
			scripts : {
				files : ['src/**/*.js', 'lib/**/*.js', 'src/**/*.css', 'lib/**/*.css'],
				tasks : ['concat', 'uglify', 'cssmin'],
				options : {
					spawn : false,
				},
			},
		},
		concat : {
			options : {
				banner : "",
				process : function (src, filepath) {
					return '// Source: ' + filepath + '\n' +
					src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
				},
			},
			basic_and_extras : {
				files : {
					'build/quasar.js' : ['lib/**/*.js', 'src/**/*.js'],
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);

};
