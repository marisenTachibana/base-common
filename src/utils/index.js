const modules = import.meta.glob('/src/utils/util/*.js',{ eager: true })
let model = {}
//遍历所有文件
for (let key in modules) {
  let module = modules[key].default
  model={...model,...module}
}
export default {
  ...model
}