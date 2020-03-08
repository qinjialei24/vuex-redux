import nodeResolve from 'rollup-plugin-node-resolve'     // 帮助寻找node_modules里的包
import babel from 'rollup-plugin-babel'                             // rollup 的 babel 插件，ES6转ES5
import replace from 'rollup-plugin-replace'                       // 替换待打包文件里的一些变量，如 process在浏览器端是不存在的，需要被替换
import commonjs from 'rollup-plugin-commonjs'              // 将非ES6语法的包转为ES6可用
import uglify from 'rollup-plugin-uglify'                              // 压缩包

const env = process.env.NODE_ENV

const config = {
  input: 'src/index.js',
  output: {
    name:'vuex-redux',
    file: './dist/main.min.js',
    format: 'es',       　　　　　　　　　　 // 输出 ＵＭＤ格式，各种模块规范通用
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    commonjs()
  ]
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config