var { src, dest, watch } = require('gulp');
var ts = require('gulp-typescript');

function compileTS() {
    return src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'output.js'
        }))
        .pipe(dest('dist/'));
}

function watchTask() {
    watch('src/**/*.ts', compileTS);
}

exports.default = compileTS;
exports.watch = watchTask;