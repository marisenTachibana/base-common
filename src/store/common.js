import { defineStore } from 'pinia'
import { onUnmounted } from 'vue'

export default defineStore('common', {
  state: () => {
    return {
      loaded: {
        def: false,
        btn: false,
        page: false,
      },
      cache: {},
    }
  },
  actions: {
    SET_LOADING(args) {
      this.loaded[args.type] = args.status;
    },
    REST_ALLLOADING() {
      for (let item in this.loaded) {
        this.loaded[item] = false;
      }
    },
    
    async getCache(key) {
      if (import.meta.env.DEV) {
        console.log('已经获取缓存:' + key);
      }
      return this.cache[key].data
    },

    /**
     * 
     * @param {回调方法 用以获取数据} cb  return bool 判断是否继续执行循环的bool
     */

    async loop(cb,time=30000) {
      let loop = async () => {
        clearTimeout(this.timer)
        if (await cb()) {
          this.timer = setTimeout(() => {
            loop()
          }, time)
        }
      }
      loop()
      onUnmounted(async () => {
        clearTimeout(this.timer)
      })
    }
  },
  getters: {}
})