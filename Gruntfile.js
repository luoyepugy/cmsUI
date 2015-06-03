
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    '../cms/html/css/common.min.css': 'sass/common.sass', 
                    '../cms/html/css/pages/index.min.css': 'sass/pages/index.sass',
                    '../cms/html/css/pages/circle.min.css': 'sass/pages/circle.sass',
                    '../cms/html/css/pages/space.min.css': 'sass/pages/space.sass',
                    '../cms/html/css/pages/email.min.css': 'sass/pages/email.sass'
                }
            }
        },
        uglify: {
            options: {  
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },  
            buildall:{
                expand:true,
                cwd: 'js/pages/',
                src: ['**/*.js'],
                dest: '../cms/html/js/pages/',
                ext: '.js'
            },
            build: { 
                files: {
                    '../cms/html/js/common.js': 'js/common.js'
                }         
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3 
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '../cms/html/images/'
                }]
            }
        },
        watch: {
	        options: { 
                livereload: true,
                spawn: false    
	        },
            css: {
                files: '**/*.sass',
                tasks: ['sass']
            },
            js: {
                files: 'js/**/*.js',
                tasks: ['uglify']
            }	
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('img', ['imagemin']);    
}

