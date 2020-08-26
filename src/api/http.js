import axios from 'axios'
import orderAPI from './order'
import { Loading } from 'element-ui';
let loadingInstance
console.log(process.env.VUE_APP_BASE_URL);
// obj 循环遍历输出不同的请求方法

let instance = axios.create({
  // baseURL: 'https://java01.zm123.com/',
  timeout: 35000,
  withCredentials: true, // 请求头部自动带上setcookie
  headers: { 'Cookie': 'PIDDAB666666=2020050310443353531752; FVTDAB666666=637240994745666020; MSTSDAB666666=0; VTSDAB666666=10; LVTDAB666666=637308767814418503; SIDDAB666666=dae5236da19541999268a223e93be8b1; VPSDAB666666=30; radius=101.232.202.155; uudid=cms8193a26c-be06-04a5-2298-fba822edd400; ASP.NET_SessionId=uqk10xwum30fc2fy3msvqjqp; Hm_lvt_dde6ba2851f3db0ddc415ce0f895822e=1595663392,1595731832; Hm_lvt_6c7f533b7cc67b6f40de81580fec468e=1593184227,1594433282,1595642644,1595733947; Hm_lpvt_6c7f533b7cc67b6f40de81580fec468e=1595733957; cookAdminID=170; cookAdmin=linzy; adminUserName=%e6%b5%8b%e8%af%95%e7%bb%84%ef%bc%8d%e6%9e%97%e7%b4%ab%e8%8b%b1; encId=4B28EE46953C64486550D4437ED9CC40; Hm_lpvt_dde6ba2851f3db0ddc415ce0f895822e=1595769992' },
})



const Http = {}// 包裹请求方法的容器

const obj = Object.assign(orderAPI)
// 请求格式/参数的统一
for (let key in obj) {
  let api = obj[key] // url method
  // async 作用：避免进入回调地狱
  Http[key] = async function (
    params, // 请求参数 get：url，put，post，patch（data），delete：url
    isFormData = false, // 标识是否是form-data请求
    // 配置参数
    config = {}) {
    let newParams = {}
    //  content-type是否是form-data的判断
    if (params && isFormData) {
      newParams = new FormData()
      for (let i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }

    // 不同请求的判断
    let response = {}// 请求的返回值
    if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
      try {
        response = await instance[api.method](api.url, newParams, config)
      } catch (err) {
        response = err
      }
    } else if (api.method === 'delete' || api.method === 'get') {
      config.params = newParams
      try {
        response = await instance[api.method](api.url, config)
      } catch (err) {
        response = err
      }
    }

    return response // 返回响应值
  }
}

// 拦截器的添加
// 请求拦截器
instance.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    lock: true,
    text: '拼命请求中',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.7)',

  });
  return config
}, () => {
  // 请求错误
  /* Toast.clear()
  Toast('请求错误，请求稍后重试') */
})
// 响应拦截器
instance.interceptors.response.use(res => {
  // 请求成功
  loadingInstance.close()
  return res.data
}, error => {

  return Promise.reject(error.response)
})

export default Http
