//封装使用的ajax方法
import axios from 'axios'
import qs from 'qs'
import config from './config'

const baseUrl = config.baseUrl

axios.defaults.timeout = 100000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.baseURL = baseUrl;   //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //console.log(config)
    //在发送请求之前做某件事
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    //对响应数据做些事
    if (!res.data.success) {
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    if (error && error.response) {
        switch (error.response.status) {
          case 401:
            // location.reload()
            return
          
        }
        // 请求错误处理
        return Promise.reject(error)
      } else {
        return Promise.reject(error)
      }
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'post',
            data: params
        })
            .then(res => {
                //成功
                resolve(res.data)
            })
            .catch(res => {
                //失败
                reject(res)
            })

    })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: param })
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    fetchPost,
    fetchGet,
}