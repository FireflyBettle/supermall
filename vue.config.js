
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config)=>{
      config.resolve.alias
          .set('@$', resolve('src'))
          .set('assets',resolve('src/assets'))
          .set('components',resolve('src/components'))
          .set('network',resolve('src/network'))
          .set('views',resolve('src/views'))
          .set('common',resolve('src/common'))
  },
  devServer: {
    open: true,
    host: '192.168.31.233',
    port: 8080,
    https: false,
    proxy: null, // 设置代理
    before: app => {}
  }

  }
