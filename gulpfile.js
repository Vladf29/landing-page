'use strict'
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
// const myCustomFS = require('some-custom-fs');

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });


    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/**
 * Pug compile
 */
gulp.task('templates:compile', function buildHTML() {
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty: true
            // Your options in here. 
        }))
        .pipe(gulp.dest('build'));
});

/**
 * Sass compile
 */

gulp.task('style:compile', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});


/**
 * Sprite
 */
gulp.task('sprite', function () {
    var spriteData = gulp.src('source/img/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.scss'
    }));

    spriteData.img.pipe(gulp.dest('build/img'));
    spriteData.img.pipe(gulp.dest('source/styles/global/'));
    cd();
});


/**
 * Delete
 */

// gulp.task('clean', function del(cd) {
//     return rimraf('build', myCustomFS, cd);
// });

/**
 * Copy fonts
 */

gulp.task('copy:fonts', function () {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});


/**
 * Copy images
 */

gulp.task('copy:imgase', function () {
    return gulp.src('./source/img/**/*.*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('copy', gulp.parallel('copy:fonts', 'copy:imgase'));


/**
 * Wathers
 */

gulp.task('watch', function () {
    gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
    gulp.watch('source/styles/**/*.scss', gulp.series('style:compile'));
});

gulp.task('default'.gulp.series(
    gulp.parallel('templates:compile', 'sass:compile', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
));