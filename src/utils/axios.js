import axios from 'axios'
import useStore from '@/store/common'
import useUser from '@/store/user'
import util from '@/utils/'
import { ElMessage } from 'element-plus'
let errorCode = {
  '401':'未登录或已超时',
  '402': '用户名不存在或密码错误',
  '403': '参数不正确',
  'default': '出现错误请联系管理员'
}

let instance = axios.create();
instance.defaults.timeout = 10000
// 返回其他状态吗

instance.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}


// HTTPrequest拦截 request
instance.interceptors.request.use(async config => {
  let store = useStore()
  store.loaded[config.loaded] = true
  if (!config.url.startsWith('http') && !config.url.includes('/object') && !config.url.includes('/callback')) {
    config.url = '/api' + config.url
  }

  const isToken = config.isToken === false
  let token = util.getStore({ name: 'access_token' })
  if (token && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, err => {
  return Promise.reject(new Error(err))
})

instance.interceptors.response.use(async res => {
  let {
    config: {
      loaded
    },
    status,
    data: {
      code,
      data,
      msg
    }
  } = res
  let store = useStore()
  let  user = useUser()
  store.loaded[loaded] = false

  const message = msg || errorCode[status] || errorCode['default']
  if (status == 401) {
    user.Logout()
    location.href='/login?ret='+encodeURIComponent(location.href.replace(location.origin, ''))
  }

  if (status === 402) {
    ElMessage.error( message)
    return Promise.reject(new Error(message))
  }

  //缓存方法
  if (res.config.cache) {
    store.cache[res.config.url.replace('/api','')+JSON.stringify(res.config.params)] = {
      data,
      time: new Date().getTime()
    }
  }

  if (res.config.direct) return res //穿透直接传回所有

  if ((status !== 200 && status !== 201) || code != '200') {
    ElMessage.error( message)
    return Promise.reject(res)
  }

  return data
}, err => {
  ElMessage.error('服务器内部发生错误')
  let store = useStore()
  store.REST_ALLLOADING()

  return Promise.reject(err)
})
export default instance;

