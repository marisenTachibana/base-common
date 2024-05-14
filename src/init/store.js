
const modules = import.meta.glob('/src/store/*.js',{ eager: true })
let model = {}
//遍历所有文件
for (let key in modules) {
	let module = modules[key].default
	let name = key.split('/').pop().replace('.js', '');
	model[name] = module
}
export default () => {
	let result = {}
	for (let p in model) {
		result[p] = model[p]()
	}
	return result
};