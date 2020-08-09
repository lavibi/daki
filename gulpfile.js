const { watch, src, dest, parallel, series } = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');
// const terser = require('gulp-terser');

// let javascript = (cb) => {
//   src('./src/js/main.js')
//     .pipe(terser())
//     .pipe(dest('client/js'))
//     .pipe(dest('./web/client/js'))

//   cb()
// }

let css = (cb) => {
  src('src/css/app.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      postcssImport(),
      tailwindcss(),
      autoprefixer(),
      // cssnano()
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./dist/client/css/'))

  cb()
}

watch('src/css/**/*.css', css);
watch('dist/**/*.html', css);
// watch('src/js/**/*.js', javascript);

exports.default = series(
  parallel(css)
)
