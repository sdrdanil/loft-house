import webpack from "webpack-stream";
// import * as nodePath from 'path';
// const fs = require('fs');
import * as fs from 'fs';

export const js = async () => {
  // let entry = {};
  // const dir = `${app.path.srcFolder}/js/`;
  // fs.readdir(dir, (err, files) => {
  //   files.forEach(file => {
  //     if (file.slice(-3) != '.js') return;
  //     const name = file.slice(0, -3);
  //     console.log(name, file);
  //     entry[name] = `${dir}/${file}`;
  //   });
  //   console.log(entry);
  // });
  // console.log(entry);
  const entry = {};
  app.path.src.js.forEach(path => {
    const name = path.split('/').pop().slice(0, -3);
    entry[name] = path;
  });
  console.log(entry);

  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'JS',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(webpack({
      mode: app.isBuild ? 'production' : 'development',
      output: {
        filename: '[name].min.js'
      },
      entry: entry
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream())
}
