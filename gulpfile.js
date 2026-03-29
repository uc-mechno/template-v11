var gulp = require("gulp");
var sass = require("gulp-sass");
var sassGlob = require("gulp-sass-glob");
// var sourcemaps = require("gulp-sourcemaps");
// gulp-stylelintと同時に使うとうまく機能しないため停止
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssdeclsort = require("css-declaration-sorter");
var mqpacker = require("css-mqpacker");
var gulpStylelint = require("gulp-stylelint");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var replace = require("gulp-replace");
var pug = require("gulp-pug");
var browserSync = require("browser-sync");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var changed = require('gulp-changed');

// sass
gulp.task("sass", function () {
  return (
    gulp
      .src("./assets/sass/**/*.scss")
      .pipe(
        plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
      )
      // .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(postcss([mqpacker()]))
      // .pipe(sourcemaps.write({ includeContent: false }))
      // .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(postcss([autoprefixer({
        grid: true, // css gridに対応
        cascade: false // 不要な整形をしない
        })
      ]))
      .pipe(postcss([cssdeclsort({ order: "alphabetical" })]))
      .pipe(
        gulpStylelint({
          fix: true,
        })
      )
      // .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./assets/css"))

      // notifyでコンパイル成功通知
      .pipe(
        notify({
          title: "Sass Build",
          message: "Sass build complete",
        })
      )
  );
});

// sass compress
gulp.task("sass:min", function () {
  return (
    gulp
      .src("./assets/sass/**/*.scss")
      .pipe(
        plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
      )
      // .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(sass({ outputStyle: "expanded" }))
      // .pipe(sourcemaps.write({ includeContent: false }))
      // .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(postcss([autoprefixer({
        grid: true, // css gridに対応
        cascade: false // 不要な整形をしない
        })
      ]))
      .pipe(postcss([cssdeclsort({ order: "alphabetical" })]))
      .pipe(
        gulpStylelint({
          fix: true,
        })
      )
      // css圧縮追加
      .pipe(cleanCSS({ rebase: false })) //相対パスを削除させないようにrebaseを設定
      .pipe(
        rename({
          extname: '.min.css',
        })
      )
      .pipe(postcss([mqpacker()]))
      // .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./assets/css"))

      // notifyでコンパイル成功通知
      .pipe(
        notify({
          title: "Sass Compress",
          message: "Sass compress complete",
        })
      )
  );
});

// pug
gulp.task("pug", function () {
  return gulp
    .src(["./assets/pug/**/*.pug", "!./assets/pug/**/_*.pug"])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./"))
    .pipe(
      notify({
        title: "PUG Build",
        message: "PUG build complete",
      })
    )
});

// js
gulp.task('js', function () {
  return gulp
  .src("./assets/sjs/**/*.js")
  // .src(['./src/js/first.js', './src/js/second.js']) //concatの順番を指定したいとき
  .pipe(
    plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
  )
  .pipe(concat('main.js')) // main.jsに他のjsファイルをconcat
  .pipe(gulp.dest("./assets/js"))
  .pipe(
    notify({
      title: "JS Build",
      message: "JS build complete",
    })
  )
});

// js compress
gulp.task('js:min', function () {
  return gulp
  .src("./assets/sjs/**/*.js")
  .pipe(
    plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
  )
  .pipe(concat('main.js')) // main.jsに他のjsファイルをconcat
  .pipe(uglify()) //minify
    .pipe(rename({
      suffix: ".min",
    }))
  .pipe(gulp.dest("./assets/js"))
  // notifyでコンパイル成功通知
  .pipe(
    notify({
      title: "JS Compress",
      message: "JS compress complete",
    })
  )
});

// 画像の圧縮
gulp.task("imagemin", function () {
  return gulp
    .src('./assets/img/**')
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(changed('./assets/images'))
    .pipe(
      imagemin([
        pngquant({
          quality: [.65, .8],
          speed: 1
        }),
        mozjpeg({
          quality: 85,
          progressive: true // // プログレッシブjpeg
        }),
        imagemin.svgo(), // svgの圧縮
        imagemin.optipng(), // png画像が暗くなるバグ対策
        imagemin.gifsicle() // gifの圧縮
      ])
    )
    .pipe(gulp.dest('./assets/images'))
     // notifyでコンパイル成功通知
  .pipe(
    notify({
      title: "Image Compress",
      message: "Image compress complete",
    })
  )
});

// watch
// gulp.task('default', function() {
//   gulp.watch('./src/images/**', gulp.task('imagemin'));
// });

// function minifyImage () {
//   return gulp
//     .src('./src/images/**')
//     .pipe(
//       plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
//     )
//     .pipe(changed('./dist/images'))
//     .pipe(
//       imagemin([
//         pngquant({
//           quality: [.65, .8],
//           speed: 1
//         }),
//         mozjpeg({
//           quality: 85,
//           progressive: true // // プログレッシブjpeg
//         }),
//         imagemin.svgo(), // svgの圧縮
//         imagemin.optipng(), // png画像が暗くなるバグ対策
//         imagemin.gifsicle() // gifの圧縮
//       ])
//     )
//     .pipe(gulp.dest('./dist/images'))
//      // notifyでコンパイル成功通知
//   .pipe(
//     notify({
//       title: "Image Compress",
//       message: "Image compress complete",
//     })
//   )
// };

// srcフォルダを監視
// function watchFile() {
//   gulp.watch("./src/images/**", minifyImage);
// }

// gulpコマンドで実行できるように設定
// exports.default = watchFile;

// サーバーを立ち上げる
gulp.task("serve", function (done) {
  browserSync.init({
    browser: "Google Chrome",
    server: {
      baseDir: "./",
    },
    open: "local",
    ghostMode: {
      "clicks": false,
      "scroll": false,
      "location": false,
      "forms": {
        "submit": false,
        "inputs": false,
        "toggles": false
      }
    }
  });
  done();
  console.log("サーバーの起動");
});

// ブラウザのリロード
gulp.task("reload", function (done) {
  browserSync.reload();
  done();
  console.log("ブラウザのリロード");
});

// 監視ファイル
gulp.task("watch", function (done) {
  // gulp.watch("./**/*.html", gulp.task("reload"));
  // gulp.watch("style.css", gulp.task("reload"));
  // gulp.watch("./**/*.php", gulp.task("reload"));
  // gulp.watch("./dist/css/**/*.css", gulp.task("reload"));
  gulp.watch("./assets/sjs/**/*.js", gulp.task("js"));
  gulp.watch("./assets/sass/**/*.scss", gulp.task("sass"));
  gulp.watch("./assets/pug/**/*.pug", gulp.task("pug"));
  gulp.watch("./assets/img/**", gulp.task('imagemin'));
  // gulp.watch("./src//images/**", gulp.task("reload"));
  gulp.watch("./assets/sjs/**/*.js", gulp.task("reload"));
  gulp.watch("./assets/js/**/*.js", gulp.task("reload"));
  gulp.watch("./assets/css/**/*.css", gulp.task("reload"));
  gulp.watch("./assets/sass/**/*.scss", gulp.task("reload"));
  gulp.watch("./assets/pug/**/*.pug", gulp.task("reload"));
  done();
  console.log("ファイルの監視");
});

// sassファイルの監視、コンパイル
gulp.task("sass:watch", function (done) {
  gulp.watch("./assets/sass/**/*.scss", gulp.task("sass"));
  done();
  console.log("タスクを実行");
});

// pugファイルの監視、コンパイル
gulp.task("pug:watch", function (done) {
  gulp.watch(["./assets/pug/**/*.pug"], gulp.task("pug"));
  done();
  console.log("タスクを実行");
});

// jsファイルの監視、コンパイル
gulp.task("js:watch", function (done) {
  gulp.watch(["./assets/js/**/*.js"], gulp.task("js"));
  done();
  console.log("タスクを実行");
});

// release
gulp.task(
  "release",
  gulp.series("sass:min", "js:min", function (done) {
    done();
    console.log("タスクの実行");
  })
);

// サーバーは立ち上げないでビルドだけしたい時につかう。
gulp.task(
  "build",
  gulp.series("sass", "js", function (done) {
    done();
    console.log("タスクの実行");
  })
);

// タスクの実行
gulp.task(
  "default",
  gulp.series("serve", "watch", function (done) {
    done();
    console.log("タスクの実行");
  })
);
