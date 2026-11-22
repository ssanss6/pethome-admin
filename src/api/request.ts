import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('pethome_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

request.interceptors.response.use(
  (response) => {
    const body = response.data
    if (body && body.code === 0) {
      return body.data
    }
    if (body && body.code === 401) {
      localStorage.removeItem('pethome_admin_token')
      localStorage.removeItem('pethome_admin_user')
      ElMessage.error('请先登录')
      window.location.href = '/login'
      return Promise.reject(body)
    }
    ElMessage.error(body?.message || '请求失败')
    return Promise.reject(body)
  },
  (error) => {
    ElMessage.error('网络异常，请检查后端是否启动')
    return Promise.reject(error)
  }
)

export default request
