import transfer from '@/utils/apis'

const modules = import.meta.glob('/src/apis/*.js', { eager: true }) 
let apis = {}
//遍历所有文件
for (let key in modules) {
  let module = modules[key].default
  let name = key.split('/').pop().replace('.js', '');
  for (let p in module) {
    let [key, method = 'get'] = `${name}/${p}`.split('|')
    //封装 把所有的接口封装成方法
    apis[key] = function (args, extra, direct) {      
      return transfer(module[p], args, method, extra, direct);
    }
  }
}

export default apis;