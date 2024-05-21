import {defineStore} from 'pinia'
import {onUnmounted} from 'vue'
import apis from '@/init/api'
import {transTree} from '#util'
import {fullRoutes, layoutRoute} from '@/router/route'


export default defineStore('common', {
    state: () => {
        return {
            loaded: {
                def: false,
                btn: false,
                page: false,
            },
            cache: {},
            routerList: [],
        }
    },
    actions: {
        async getRouterList() {
            let r = await apis['common/getRouteList']()
            const list = r.map((t) => ({
                id: t.id,
                pid: t.parentId,
                name: t.name,
                path: t.path,
                meta: {
                    title: t.title,
                    icon: t.icon,
                    type: t.type,
                },
                //正确写法 import(`/src/views${t.component}`)
                //错误写法 import(`@/views${t.component}`)
                component: () => import(`/src/views${t.component}`)
            }));
            console.log(`@/views${r[0].component}`);
            console.log('@/views/fullScreen/demo.vue')
            let ss = transTree(list)?.map(t => {
                const {id, pid, ...obj} = t;
                return obj;
            })
            console.log(ss);
            this.routerList = [layoutRoute, ...fullRoutes, ...ss];
            this.loaded.page = true;
        },
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

        async loop(cb, time = 30000) {
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