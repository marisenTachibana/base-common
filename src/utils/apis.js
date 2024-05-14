import axios from './axios'
import useStore from '@/store/common'
export default function (urls, args, method, extra, direct = 0) {
  let params = args || {};
  let result = { method }
  //保留扩展方法 
  if (typeof urls == 'object') {
    result = { ...result, ...urls }
  } else {
    result.url = urls
  }

  //路径参数 /detail/{id} 匹配这种形式
  if (result.url && result.url.includes('{')) {
    params = { ...args }
    // 替换参数
    result.url = result.url.replace(/{(.*?)}/g, function (all, key) {
      params[key] && delete params[key]
      return (key in args) ? args[key] : '';
    });
  }
  //根据loading状态来设置要传给配置器的状态
  let loaded = extra || 'def';
  if (extra && extra.includes('@d')) {
    direct = 1;
    loaded = 'def';
  }

  result.loaded = loaded
  result.direct = direct
  //添加路径参数的配置,当设置参数t{type}为path时候 无论什么都直接添加为路径参数
  if (urls.t == 'path' || (method && method.toLowerCase() == 'get')) {
    result.params = params
  } else {
    result.data = params
  }

  //缓存的方法
  if (urls.cache && (method && method.toLowerCase() == 'get')) {
    if (typeof urls.cache != 'object') {
      urls.cache = {
        time: 1000 * 60 * 10
      }
    }
    let store = useStore()
    let key = urls.url.replace('/api', '') + JSON.stringify(params)
    let cache = store.cache[key]
    if (cache && extra && extra.includes('@c')) {
      cache.time = 0
    }

    if (cache && (Date.now() - cache.time) <= urls.cache.time) {
      return store.getCache(key)
    }
  }
  return axios(result)
}