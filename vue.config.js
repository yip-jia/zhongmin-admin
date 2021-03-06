const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')
const cookie = 'ASP.NET_SessionId=wmsmgyjyrlaeu4pyl3eq2yyv; cookAdminID=170; cookAdmin=linzy; adminUserName=%e6%b5%8b%e8%af%95%e7%bb%84%ef%bc%8d%e6%9e%97%e7%b4%ab%e8%8b%b1; encId=4B28EE46953C64486550D4437ED9CC40'
const qs = require('qs')
axios.defaults.timeout = 35000;

module.exports = {
  // 让vant框架支持rem
  publicPath: './',
  pluginOptions: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 20,
      propList: ['*']
    }
  },
  configureWebpack: {
    externals: {
      'echarts': 'echarts' // 配置使用CDN
    }
  },
  /* chainWebpack: config => {
    config.resolve.alias
      .set('components', path.join(__dirname, 'src/components'))
      .set('common', path.join(__dirname, 'src/common'))
      .set('base', path.join(__dirname, 'src/base'))
  }, */

  /* 跨域代理请求 */
  devServer: {
    before(app) {
      app.get('/Account/GetUserList', function (req, res) {
        const url = 'https://manage2018.zhongmin.cn/Account/GetUserList'
        axios.get(url, {
          headers: {
            referer: 'https://manage2018.zhongmin.cn/',
            host: 'manage2018.zhongmin.cn',
            cookie: cookie
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
        app.get('/FinancialStatis/GetFinanceCharts', function (req, res) {
          const url = 'https://manage2018.zhongmin.cn/FinancialStatis/GetFinanceCharts'
          axios.get(url, {
            headers: {
              referer: 'https://manage2018.zhongmin.cn/',
              host: 'manage2018.zhongmin.cn',
              cookie: cookie
            },
            params: req.query
          }).then((response) => {
            res.json(response.data)
          }).catch((e) => {
            console.log(e)
          })
        }),
        app.post('/FinancialStatis/getTotalAll', bodyParser.json(), function (req, res) {
          const url = 'http://manage2018.zhongmin.cn/FinancialStatis/getTotalAll'
          axios.post(url, qs.stringify(req.body), {
            headers: {
              referer: 'https://manage2018.zhongmin.cn/',
              host: 'manage2018.zhongmin.cn',
              cookie: cookie,
              'Content-type': 'application/x-www-form-urlencoded'
            },
          }).then((response) => {
            res.json(response.data)
          }).catch((e) => {
            console.log(e)
          })
        })

    },
    host: '192.168.1.101', // 192.168.3.49
    port: 8080,
    /*   proxy: {
          '/': {
              target: 'https://manage2018.zhongmin.cn/',
              ws: true,
              changeOrigin: true
          }
      } */
  },
  productionSourceMap: false

}
