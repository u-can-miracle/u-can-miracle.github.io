var gulp = require('gulp'),
    less = require('gulp-less'),                        // less compiler
    mainBowerFiles = require('main-bower-files'),
    //gulpFilter = require('gulp-filter'),
    //addsrc = require('gulp-add-src'),
//debug = require('gulp-debug'),
    print = require('gulp-print'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path'),
//underscore = require('underscore'),
    uglify = require('gulp-uglify'),                    // uglifies the js
    plumber = require('gulp-plumber'),                  // disable interuption
    minifycss = require('gulp-minify-css'),             // minify the css files
    concat = require('gulp-concat'),                    // concatinate js
    autoprefixer = require('gulp-autoprefixer');        // sets missing browserprefixes


var targets = {
    less: [
        'less/theme/*.less',
        'less/color-switcher.less'
    ],                                                // all less files
    cssDest: 'css',                                   // css output folder
    fontsDest: 'css/fonts',                           // fonts output folder
    styles:[
        'bower_components/vegas/dist/jquery.vegas.css',
        'bower_components/pace/themes/pace-theme-big-counter.css'
    ],
    scripts:[
        'bower_components/jquery-waypoints/shortcuts/sticky-elements/waypoints-sticky.js',
        'bower_components/mixitup/src/jquery.mixitup.js',
        'bower_components/Blur.js/blur.js',
        'bower_components/modernizr/modernizr.js',
        'src/script.js',
        'src/color-switcher.js'
    ],
    jsDest: 'js',                                     // JS folder
};

gulp.task('bowerfiles', function () {
    gulp
        .src(mainBowerFiles())
        .pipe(print());
});

/* copy fonts from bower components to production */
gulp.task('bowerfonts-copy', function () {
    var fontsRegEx = (/(.*\.otf$)|(.*\.eot$)|(.*\.svg$)|(.*\.ttf$)|(.*\.woff$)/i);
    gulp
        .src(mainBowerFiles({filter: fontsRegEx}))
        .pipe(gulp.dest(targets.fontsDest));
});
/* compile themes */
gulp.task('less', function () {
    gulp.src(targets.less)
        .pipe(sourcemaps.init({loadMaps: true, sourceRoot: '/'}))
        .pipe(less({
            paths: [path.join(__dirname, 'bower_components/**/*.less', 'less/style.less', 'less/includes/*.less')],
            sourceMap: true
        }))
        .pipe(print())
        .pipe(autoprefixer(                             // complete css with correct vendor prefixes
            'last 10 version',
            '> 1%',
            'ie 8',
            'ie 9',
            'ios 6',
            'android 4'
        ))
        /*.pipe(minifycss())*/
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(targets.cssDest));

});
/* compile bower and custom scripts to one file */
gulp.task('js', function () {
    var jsRegEx = (/.*\.js$/i),
        src=mainBowerFiles({filter: jsRegEx});

    src=src.concat(targets.scripts);
//console.log(src);
    gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(uglify())                                 // uglify the files
        .pipe(print())
        .pipe(concat('scripts.min.js'))                 // concatinate to one file
        //.pipe(gulp.dest(target.js_dest))                // where to put the files
        .pipe(sourcemaps.write('../maps'))

        .pipe(gulp.dest(targets.jsDest));

});


/* copy bower and custom scripts to one folder */
gulp.task('js-prod', function () {
    var jsRegEx = (/.*\.js$/i),
        src=mainBowerFiles({filter: jsRegEx});

    src=src.concat(targets.scripts);
    gulp.src(src)
        .pipe(gulp.dest(targets.jsDest));
});


/* copy bower and custom css to one folder */
gulp.task('css-prod', function () {
    var jsRegEx = (/.*\.css$/i),
        src=mainBowerFiles({filter: jsRegEx});

    src=src.concat(targets.styles);
    gulp.src(src)
        .pipe(gulp.dest(targets.cssDest+'/lib'));
});


/* auto recompile */
gulp.task('watch', function(){
    gulp.watch(targets.less.concat(['bower_components/**/*.less', 'less/style.less', 'less/includes/*.less']), ['less']);
    // gulp.watch(targets.scripts, ['js']);
    // gulp.watch('bower_components/**/*', ['js','less','bowerfonts-copy']);
});