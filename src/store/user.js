import { defineStore } from 'pinia'
import utils from '@/utils/'
import apis from '@/init/api'
import useCommon from './common'
export default defineStore('user', {

  state: () => {
    return {
      userinfo: {
        userName:'',
        loginCode:'',
        password:'',
      },
    }
  },
  actions: {
    Logout() {
      let common = useCommon()
      this.setToken({})
      this.setUserBaseInfo()
      common.cache = {}
    },
    async LoginByUsername(userInfo) {
      // userInfo.username = userInfo.username.trim().toLowerCase()
      // const user = utils.encryption({ // 加密
      //   data: userInfo,
      //   key: 'thanks,bigplayer',
      //   param: ['password']
      // })

      // let { data: r } = await apis['lr/loginByUserName']({
      //   ...user,
      //   grant_type: 'password',
      //   scope: 'server'
      // }, 'btn', '@d')
      // // utils.Toast.success('')
      // this.setToken(r)
      // await this.GetUserBaseInfo()
      // // 在app 环境下，每次登录都需绑定推送的设备id
      // if (utils.isApp()) {
      //   this.bindDevice()
      // }
      return true
    },

    async GetUserBaseInfo() {
      let r = await apis['lr/getUserBaseInfo']()
      this.setUserBaseInfo(r)

    },
    setUserBaseInfo(r) {
      utils.setStore({
        name: 'userBaseInfo',
        type: 'local',
        content: r,
      })
    },
    setToken(r) {
      utils.setStore({
        name: 'access_token',
        type: 'local',
        content: r.access_token,
      })
    }
  }
})