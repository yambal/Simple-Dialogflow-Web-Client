module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            sample: {
                files: {
                    "docs/test.js": ["src/test.js"]
                }
            }
        },
        /*,
        uglify: {
            options: {
                mangle: true,
                compress: true
            },
            build: {
                src: "src/script.js",
                dest: "src/script.min.js"
            }
        },
        */
        pug: {
            sample01: {
                options: {
                        debug: false,
                        pretty: true
                },
                files: {
                    "docs/test.html": "src/test.pug"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    //grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-pug");
    grunt.registerTask("_Default", ["browserify", 'pug'])//, 'uglify'']);
};