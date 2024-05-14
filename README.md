
## 开发步骤

`推荐但不做限制`

1. 全局安装依赖管理工具 `pnpm`，比使用`npm`会快很多. 
``` bash
$ npm i pnpm -g
```

2. 安装所有依赖

``` bash
$ pnpm i
```

3. 编译运行代码

``` bash
$ pnpm dev
```

## git 规范

+ feat：新功能（feature）

+ fix：修补bug

+ docs：文档（documentation）

+ style： 格式（不影响代码运行的变动）

+ refactor：重构（即不是新增功能，也不是修改bug的代码变动）


## 项目规范

+ 未经商榷不准将任何依赖包添加进项目，以减少 dist 体积
+ 不可擅自修改项目配置

## 框架及代码规范

+ 命名要求全部采用 `camelCase`，且不能使用缩写，如：getBtnView(X)，getButtonView(√)。在异步请求的函数内的变量命名则无此要求，可以随意使用 `under_score_case`，方便构建请求载荷
+ 普通函数的命名请使用 `动 + 宾` 的格式，如：getCategory。事件回调函数请使用 `on + 目标对象 + 事件`，如 `onTimerChange`
+ 尽量写注释，特别是一些业务逻辑比较繁琐的流程，方便回顾的时候快速 get 到当时的想法
+ 异步请求函数请加上注释
+ 未完成的功能写好功能结构后要加上 `TODO` 标志，格式为 `// TODO: @auther - 主题颜色变更`
+ 不要在 vue template 上有过多的业务逻辑，请尽可能多地使用 `computed`,或者渲染前预先处理好数据
+ 不要随意添加任何形态的全局对象，如 mixin，修改 Vue 原型链，挂载变量对象到 window 下


### 全局loading 状态管理
我们在 `store/common.js`
```js
loaded: {
        def: false,
        btn: false,
        mod: false,
        unit: false,
    }
```
我们在网络请求的时候会在请求前转入`loading` 状态 然后请求完成后会设置`loading`状态为`false`
页面使用方法

  ``` js
  import apis from '@/init/api'
let r = apis['user/getUserInfo']({id:123},'btn')

  ```
  
需要loading的地方 对应的`this.$loaded.btn`来获取到loading的状态

页面模板 可以直接用`$loaded.btn`来定义loading状态. 默认值为def,
所以如果你请求接口又想要loading状态 可以用 `$loaded.def`来进行引用
