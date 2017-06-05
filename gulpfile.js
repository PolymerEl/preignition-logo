'use strict';

// Include Gulp & tools we'll use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var svgmin = require('gulp-svgmin');

gulp.task('svg', function() {
  // return gulp.src(['app/images/logo/working.svg' ,'app/images/logo/working-above.svg','app/images/logo/working-above2.svg', 'app/images/logo/working-online.svg', 'app/images/logo/working-round.svg', 'app/images/logo/working-round-2.svg', 'app/images/logo/working-round-3.svg', 'app/images/logo/working-round-invert.svg'])
  // return gulp.src(['app/images/logo/**.svg', 'images/infographics/**.svg', ])
  // return gulp.src([ 'images/infographics/**.svg', ])
  return gulp.src([ 'dev/**.svg', ])
    .pipe(svgmin({
      plugins: [{
        removeAttrs: { attrs: '(fill|stroke|opacity|id|letter-spacing|color|overflow|stroke-width|fill-rule|fill-opacity)' }
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
    .pipe(gulp.dest('svgmin'));
});