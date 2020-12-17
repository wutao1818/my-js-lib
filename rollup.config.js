import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';
import postcss from 'rollup-plugin-postcss';
import url from 'postcss-url';
import purl from "rollup-plugin-url";
import json from 'rollup-plugin-json';

export default {
  input: './src/index.js',
  output: {
    file: path.resolve(__dirname, './lib', 'index.js'),
    // amd – 异步模块定义，用于像RequireJS这样的模块加载器
    // cjs – CommonJS，适用于 Node 和 Browserify/Webpack
    // es – 将软件包保存为ES模块文件
    // iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
    // umd – 通用模块定义，以amd，cjs 和 iife 为一体
    format: 'es',
    name: 'output-js-name',
    sourcemap: false,
    exports: 'named' // this for { export xxx }
  },
  external: ['vue', 'axios'],
  plugins: [
    postcss({
      plugins: [
        autoprefixer({
          browsers: ['Android >= 4.0', 'iOS >= 7']
        }),
        pxtorem({
          rootValue: 37.5,
          propList: ['*']  
        }),
        url({ 
          url: 'inline'
        })
      ]  
    }),
    purl({
      limit: 10 * 1024,
      include: [
        "**/*.svg",
        "**/*.png",
        "**/*.jpg",
        "**/*.gif",
      ], // defaults to .svg, .png, .jpg and .gif files
      emitFiles: true,
      fileName: "[dirname][hash][extname]",
      sourceDir: path.join(__dirname, "src")
    }),
    vue({
      css: false
    }),
    babel({
      runtimeHelpers: true,
      sourceMap: false,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
      exclude: 'node_modules/**'
    }),
    json(),
    resolve(),
    commonjs() 
  ]
};