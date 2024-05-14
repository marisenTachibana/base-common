
# api说明

只需要修改api.js文件里的路由信息即可.统一地方管理请求方式以及url地址.

### 原理说明

使用二次封装  首先是api接口地址统一管理.

然后通过封装会返回一个包含所有接口请求方法名的对象,

调用接口就变成了 `apis['文件名/方法名']()`的方式.

```js
import apis from '@/init/api'
apis['文件名/方法名']().then(res=>{

})
```

###### 方法参数定义说明(都不是必填)

参数名称 | 类型 | 说明
-|-|-
args | Object | 请求参数 `包含路径参数已经所有的请求参数`
extra | String | 额外的配置 



#### 规则说明

key值里包含`函数名`以及`请求类型`,用`|`隔开,`get`类型请求默认可以不写类型名. 如此:`token|post`

value里可以带路径参数,如果携带路径参数必须要用`{}`隔开表示是动态参数.


```js
export const API = {
  //公共接口
  "token|post": '/user/token',              //获取登录token
  "modify|post": '/user/password/modify',   //修改自己的密码
}
export default API
```

###### 说明文字:`key名称内请不要留空格 暂时没有处理空格`

路由配置方式:
```js
{ 
  token:{ //详情模式
    url:'outh/token', //请求地址
    isToken:false,//不传或者为true都是携带token
    headers:{   //head头信息 你想要附加到header头的内容
    
      ...
    }
  },
  userInfo|POST:'user/userInfo' //post 请求获取用户详情的api
}

调用方式  apis['user/token']()

```


## 统一错误处理
在axiso里封装了统一的错误处理,原则上只有请求200 并且code 为0的 数据才会返回给页面. 
如果需要单独处理 把code 跟 data 还有msg 都返回的话 可以在 请求里加参数 `@d`
get请求可以在请求参数中增加 `@c` 使每次都从后端请求，而不读取缓存

```js
apis.getUserInfo({},'@d')

//或者
apis.getUserInfo({},'btn','@d')
```