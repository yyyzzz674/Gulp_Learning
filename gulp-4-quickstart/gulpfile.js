const gulp = require('gulp')

const rollup = require('rollup') // js模块打包
const babel = require('rollup-plugin-babel') // es6=>es5
const eslint = require('rollup-plugin-eslint').eslint // 检查js
const commonjs = require('rollup-plugin-commonjs') // 导入commonjs库
const resolve = require('rollup-plugin-node-resolve') // 导入第三方库
// const builtins = require('rollup-plugin-node-builtins')
// const globals = require('rollup-plugin-node-globals')
const json = require('@rollup/plugin-json') // 读取json文件
// const replace = require('@rollup/plugin-replace') // 替换字符
// const rename = require('gulp-rename')

const paths = {
  src: './src', // 源文件
  build: './build' // 打包文件
}

// js编译 使用rollup打包
async function js() {
  const inputOptions = {
    input: paths.src + '/js/index.js',
    plugins: [
      resolve(),
      commonjs(),
      // globals(),
      // builtins(),
      json(),
      babel({
        exclude: 'node_modules/**' // 排除node_modules下的文件
      }),
      eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: [paths.src + '/**/*.js'],
        exclude: ['node_modules/**']
      })
    ]
  }
  const outputOptions = {
    file: paths.build + '/js/index.js',
    format: 'umd',
    // amd – 异步模块定义，用于像RequireJS这样的模块加载器
    // cjs – CommonJS，适用于 Node 和 Browserify/Webpack
    // es – 将软件包保存为ES模块文件
    // iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
    // umd – 通用模块定义，以amd，cjs 和 iife 为一体
    sourcemap: true,
    name: 'result'
  }
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
  return gulp
    .src(paths.build + '/js/index.js')
    .pipe(gulp.dest(paths.build + '/js'))
}

exports.js = js

gulp.task('default', gulp.series(js))
