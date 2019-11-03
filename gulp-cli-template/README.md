### 背景

在之前分布尝试过不同的第三方编译工具，比如[weflow](https://weflow.io/),[legoflow](https://legoflow.com/)等等之后，仍感觉抛出的配置参数功能不够顺手，它们底层其实也是用 gulp.js 配合少量其它的打包工具来封装实现的，主要方法是将 config 用模块化的方式来，逐个读取所需的 stream 实现。

公司之前的不少 PC 端项目都是使用的 gulp.js，好处是上手快，配置轻巧，并且可以集成其它的打包工具来填平短板。所以打算整理一下。

主要是根据 node 环境来抽离出开发阶段与打包阶段的 stream，尽量的加快编译速度以及打包速度。

### 目录结构

![目录结构](https://github.com/kpengWang/Blog-images-storage/blob/master/2018-07-15/0.png)

主要分为三个目录文件夹

- `src` 开发环境资源文件
- `node_modules` 依赖包
- `dist` 生产环境(编译后文件)

以及一些其它的配置文件

- `.babelrc` babel 的规则配置文件
- `.eslintignore`eslint 忽略的规则配置文件
- `.eslintrc` eslint 执行的规则配置文件
- `gulpfile.js` gulp 的 stream 配置文件
- `typings.json` typings 的配置文件

![src目录说明](https://github.com/kpengWang/Blog-images-storage/blob/master/2018-07-15/1.png)

### 开发环境

`npm run dev`

1. **Sass 语法编译**(对应的 sourcemap 映射以及 autoprefixer 抹平兼容性前缀)
2. **Babel** (对应的 sourcemap 映射)
3. **sprite 雪碧图**（自动生成相应的背景图片定位 scss 文件）
4. **includefile**
5. **集成 typings**(jquery,lodash 语法提示)
6. **集成 art-template**
7. **集成 Rollup**（主要使用 tree-shaking 摇树功能）
8. **集成 eslint**
9. **middle-ware-server 中间层代理**
10. **热更新**

根据下图不难看出，目前的模块化形式为`umd`标准，即兼容 amd 与 conmmonjs 的写法，可以解决跨平台的解决方案。
最关键的是实现了`tree-shaking`, 即不会将整个 import 的 js 模块文件内容加入进来，而是仅将代码中使用到的方法导入，使得压缩包内容
![dev阶段](https://github.com/kpengWang/Blog-images-storage/blob/master/2018-07-15/2.png)

---

### 打包阶段

`npm run build`

1. 压缩 html,js,css 以及图片静态资源
2. 添加 md5

![压缩](https://github.com/kpengWang/Blog-images-storage/blob/master/2018-07-15/4.png)

### 引申

#### typings 实现智能

这一点主要是针对编辑器，[Typings 实现智能](http://www.cnblogs.com/Leo_wl/p/5455619.html)

![typings](https://github.com/kpengWang/Blog-images-storage/blob/master/2018-07-15/5.gif)
