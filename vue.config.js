const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')

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
                        cookie: 'PIDDAB666666=2020050310443353531752; FVTDAB666666=637240994745666020; MSTSDAB666666=0; VTSDAB666666=10; LVTDAB666666=637308767814418503; SIDDAB666666=dae5236da19541999268a223e93be8b1; VPSDAB666666=30; radius=101.232.202.155; uudid=cms8193a26c-be06-04a5-2298-fba822edd400; ASP.NET_SessionId=uqk10xwum30fc2fy3msvqjqp; Hm_lvt_dde6ba2851f3db0ddc415ce0f895822e=1595663392,1595731832; Hm_lvt_6c7f533b7cc67b6f40de81580fec468e=1593184227,1594433282,1595642644,1595733947; Hm_lpvt_6c7f533b7cc67b6f40de81580fec468e=1595733957; cookAdminID=170; cookAdmin=linzy; adminUserName=%e6%b5%8b%e8%af%95%e7%bb%84%ef%bc%8d%e6%9e%97%e7%b4%ab%e8%8b%b1; encId=4B28EE46953C64486550D4437ED9CC40; Hm_lpvt_dde6ba2851f3db0ddc415ce0f895822e=1595769992'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data)
                }).catch((e) => {
                    console.log(e)
                })
            })
        },
        host: '192.168.1.101',
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
