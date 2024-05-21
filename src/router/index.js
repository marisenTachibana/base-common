import {createRouter, createWebHashHistory} from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import utils from '@/utils'
import {ElLoading} from 'element-plus'
import useStore from '@/store/common'
import {toRaw} from 'vue'


//路由数组
let routes = [];


const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(255, 255, 255, 0.7)',
})

const getRoutes = async (store) => {
    //从后端请求路由数据
    await store.getRouterList()
    toRaw(store.routerList).forEach(t => {
        if (!router.hasRoute(t.name)) router.addRoute(t)
    })
    //数据请求完成后关闭loading
    loading.close()
}


// 创建路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


router.beforeEach(async (to, from, next) => {
    console.log('to', to);
    NProgress.configure({showSpinner: false});
    if (to.meta.title) {
        NProgress.start()
        document.title = to.meta.title;
    }
    ;
    const token = utils.getStore('access_token')
    if (to.path === '/login') {
        if (token) {
            next('/');
        } else {
            next()
        }
    } else {
        let store = useStore();
        //判断route是否已经加载完成
        if (!store.loaded.page) {
            await getRoutes(store)
            next({...to, replace: true})
        }
        if (!token) {
            next('/login')
        } else {
            next()
        }
    }
})
// 路由加载后
router.afterEach(() => {
    NProgress.done();
});
export default router;
