import axios from "axios";
import {ElMessage} from 'element-plus';

const service = axios.create({
  timeout: 30000
})

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token && config && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    // @ts-ignore
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.data.code === 2) {
      ElMessage.error(response.data.msg)
      location.href = '/login'
      return
    }
    if (response.data.code != 0) {
      ElMessage.error(response.data.msg)
      // @ts-ignore
      return Promise.reject(response.data.msg)
    }
    return response.data.data
  },
  (error) => {
    ElMessage.error(error)
    // @ts-ignore
    return Promise.reject(error)
  }
)

export default service;