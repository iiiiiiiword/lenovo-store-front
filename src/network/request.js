import axios from 'axios'
import qs from 'qs'
import { BASE_URL, USER_TOKEN_KEY } from '@/config/constants'
import { Message, MessageBox } from 'element-ui'
import { clearAll, getItem } from '@/storage'
import Nprogress from 'nprogress'


axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = 1000 * 60 * 10
axios.defaults.headers["Content-Type"] = "application/json"

function addInterceptors(axiosInstance){

  axiosInstance.interceptors.request.use(config => {
    Nprogress.start()

    let userToken = getItem(USER_TOKEN_KEY)

    if (userToken) {
      config.headers['Authorization'] = userToken
    }
    return config;
  },error => {
    console.log("请求发送失败",error)
    MessageBox.alert("请求发送失败","错误提示");
  });

  axiosInstance.interceptors.response.use(resultWrapper => {
    Nprogress.done()
    let result = resultWrapper.data;
    if (result.success) {
      return result;
    } else {
      if (result.code && result.code === 30001) {
        clearAll()
        window.location.reload()
      }else {
        MessageBox.alert(result.msg,"错误提示")
        return Promise.reject(result)
      }
    }
  },error => {
    Nprogress.done()
    console.log("服务器响应失败",error)
    Message.error("服务器响应失败")
    return Promise.reject("服务器响应失败")
  });
}

let getInstance = axios.create();
addInterceptors(getInstance);

let formPostInstance = axios.create({
  method:"post",
  headers:{
    "Content-Type": "application/x-www-form-urlencoded"
  },
  transformRequest: [function (data,headers) {
    console.log("data:",data)
    return qs.stringify(data)
  }]
});
addInterceptors(formPostInstance);

let appJsonPostInstance = axios.create({
  method:"post"
});
addInterceptors(appJsonPostInstance);


export function doGet (config) {
  return getInstance(config);
}

export function formPost (config) {
  return formPostInstance(config);
}

export function appJsonPost (config) {
  return appJsonPostInstance(config);
}
