'use strict';

// Include Gulp & tools we'll use
var gulp = require('gulp');
// var $ = require('gulp-load-plugins')();
var rename = require('gulp-rename');
var svgmin = require('gulp-svgmin');
var svg2png = require('gulp-svg2png');
var mobileIcons = require('gulp-mobile-icons');
// var imageResize = require('gulp-image-resize');

gulp.task('svg', function() {
  // return gulp.src(['app/images/logo/working.svg' ,'app/images/logo/working-above.svg','app/images/logo/working-above2.svg', 'app/images/logo/working-online.svg', 'app/images/logo/working-round.svg', 'app/images/logo/working-round-2.svg', 'app/images/logo/working-round-3.svg', 'app/images/logo/working-round-invert.svg'])
  // return gulp.src(['app/images/logo/**.svg', 'images/infographics/**.svg', ])
  // return gulp.src([ 'images/infographics/**.svg', ])
  return gulp.src([ 'src/**.svg', ])
    .pipe(svgmin({
      plugins: [{
        removeAttrs: { attrs: '(fill|stroke|id|letter-spacing|color|overflow|stroke-width|fill-rule|fill-opacity)' }
      }, {
        convertPathData: {
          // removeUseless: false,
          // makeArcs: false
          negativeExtraSpace: false,
          makeArcs: {
            threshold: 0.5, // coefficient of rounding error
            tolerance: 0.1 // percentage of radius
          }
        }
      }]
    }))
    .pipe(gulp.dest('svg'));
});

var imageResizeTask = function(size) { 
// gulp.task('svg2png', function (size) {
   return  gulp.src('svg/**.svg')
        .pipe(svg2png({
          width : size
        }))
        .pipe(rename(function (path) { path.basename += ('-' + size); }))
        .pipe(gulp.dest('img'));
      };
// });

//Image Resize
gulp.task('resize', function() {
  return [10, 32, 72, 96, 128,144, 152, 192, 384, 512, 100, 200, 400, 600, 1000].map(function(s) {
    return imageResizeTask(s);
  });
});

 
gulp.task('mobile', [], function() {
    gulp.src('svg/logo-flame.svg')
        .pipe(mobileIcons())
        .pipe(gulp.dest('img'));
});
 
// gulp.task('resize', function () {
//   return gulp.src('svgmin/**.svg')
//     .pipe(imageResize({
//       gm: 'white',
//       width : 100,
//       height : 100,
//       format: 'png',
//       // crop : true,
//       // upscale : false
//     }))
//     .pipe(gulp.dest('img'));
// });
