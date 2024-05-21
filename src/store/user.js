import {defineStore} from 'pinia'
import utils from '@/utils/'
import apis from '@/init/api'
import bcrypt from 'bcryptjs';
import useCommon from './common'

export default defineStore('user', {

    state: () => {
        return {
            userinfo: {
                userName: '',
                password: '',
            },
        }
    },
    actions: {
        Logout() {
            let common = useCommon()
            this.setToken({})
            this.setUserInfo()
            common.cache = {}
        },
        async Login(user) {
            const cost = 10; //加密盐值
            const password = await bcrypt.hash(user.password, cost);
            const username = user.username.trim().toLowerCase()
            let r = await apis['user/login']({
                username,
                password: user.password
            }, 'btn')
            this.setToken(r)
            await this.GetUserInfo()
            return true
        },

        async GetUserInfo() {
            let r = await apis['user/getUserInfo']({
                userId: 'test001'
            })
            this.setUserInfo(r)

        },
        setUserInfo(r) {
            utils.setStore({
                name: 'UserInfo',
                type: 'local',
                content: r,
            })
        },
        setToken(r) {
            utils.setStore({
                name: 'access_token',
                type: 'local',
                content: r,
            })
        }
    }
})