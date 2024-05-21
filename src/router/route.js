import Layout from '@/layout';

export const layoutRoute =
    {
        name: 'layout',
        path: '/',
        meta: {
            title: '首页',
            icon: 'HomeFilled'
        },
        component: () => import('@/layout'),
        children: [
            // {
            //     name: 'fullDemo',
            //     path: '/fullDemo',
            //     meta: {
            //         title: '大屏',
            //         icon: 'HomeFilled'
            //     },
            //     component: () => import('@/views/fullScreen/demo.vue'),
            // }
        ],
    }


export const fullRoutes = [{
    name: 'system',
    path: '/system',
    meta: {
        title: '系统设置',
        icon: 'Tools',
        type: 'layout'
    },
    children: [
        {
            name: 'systemMenu',
            path: '/systemMenu',
            meta: {
                title: '菜单管理',
                icon: 'Menu',
                type: 'layout'
            },
            component: () => import('@/views/system/menu'),
        },
        {
            name: 'systemUser',
            path: '/systemUser',
            meta: {
                title: '用户管理',
                icon: 'UserFilled',
                type: 'layout'
            },
            component: () => import('@/views/system/user'),
        }, {
            name: 'systemRole',
            path: '/systemRole',
            meta: {
                title: '角色管理',
                icon: 'User',
                type: 'layout'
            },
            component: () => import('@/views/system/role'),
        }, {
            name: 'systemDict',
            path: '/systemDict',
            meta: {
                title: '字典管理',
                icon: 'Reading',
                type: 'layout'
            },
            component: () => import('@/views/system/dict'),
        }
    ],
}, {
    name: 'login',
    path: '/login',
    meta: {
        title: '登录',
        icon: '',
        type: 'full'
    },
    component: () => import('@/views/login'),
}, {
    name: '/404',
    path: '/404',
    meta: {
        title: '当前页面不存在',
        icon: '',
        type: 'full'
    },
    component: () => import('@/views/error/404'),
}, {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    hidden: true
}
]