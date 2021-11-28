
# vue-router

## vue-router 有哪几种导航钩子?
- 全局导航钩子 
  - router.beforeEach(to, from, next),
  - router.beforeResolve(to, from, next),
  - router.afterEach(to, from ,next)
- 组件内钩子 
  - beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave 
- 单独路由独享组件
  - beforeEnter 
  - 


## 动态路由刷新空白
- 路由的持久化，而且页面刷新之后store里面的数据也清空了。为了解决上述问题，我就在登录后获取到的菜单数据列表存在storage里
- 在动态添加路由的过程中，如果有 404 页面，一定要放在最后添加，否则在登陆的时候添加完页面会重定向到 404 页面。
- 前端要把所有的页面路由写好，在Router.beforeEach做判断，如果缓存里面有路由信息，就从缓存里拿，如果缓存没有，发请求获取路由表并localstorage存储起来并交由vuex管理（我处理后端给的路由业务逻辑在vuex里写的）。然后通过addRoutes方法合并之前的路由，千万不要忘了404页面要最后push，最后退出的时候清楚缓存

## active-class 是哪个组件的属性？
- active-class 是 vue-router 模块的 router-link 组件的属性
- 当router-link标签被点击时将会应用这个样式

# 嵌套路由怎么定义
- 使用 children 定义嵌套路由

## vue-router怎么重定向页面？
- 路由中配置redirect属性
- 使用路由的别名来完成重定向

## vue-router怎么配置404页面？
- 将path: '*' 放在最后一个

## 切换路由时，需要保存草稿的功能，怎么实现呢？
- 离开守卫【beforeRouteLeave】通常用来：禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消
```js
beforeRouteLeave (to, from, next) {
  if(用户已经输入信息){
    //出现弹窗提醒保存草稿，或者自动后台为其保存
    
  }else{
    next(true);//用户离开
  }
}
```
## vue-router路由有几种模式？说说它们的区别？
- hash模式：
1.url路径会出现“#”号字符
2.hash值不包括在Http请求中，它是交由前端路由处理，所以改变hash值时不会刷新页面，也不会向服务器发送请求
3.hash值的改变会触发hashchange事件
- history模式：
1.整个地址重新加载，可以保存历史记录，方便前进后退
2.依赖H5 API和后台配置，没有后台配置的话，页面刷新时会出现404

## 说说你对router-link的了解
- hash模式：其本质就是一个组件里面通过a表情实现，数据接口既然props为to。来拼接#，使其满足hash模式

## vue-router如何响应路由参数的变化？
- 使用 watch 监听
- 向 router-view 组件中添加 key

### 为什么要响应参数变化？
- 切换路由，路由参数发生了变化，但是页面数据并未及时更新，需要强制刷新后才会变化。
- 不同路由渲染相同的组件时（组件复用比销毁重新创建效率要高），在切换路由后，当前组件下的生命周期函数不会再被调用。

## 切换到新路由时，页面要滚动到顶部或保持原先的滚动位置怎么做呢？
- 直接监测watch路由变化，然后将body的滚动距离scrollTop赋值为0
- scrollBehavior

```html
<keep-alive>
  <router-view v-if='$route.meta.xx' />
</keep-alive>
  <router-view />
<script>
scrollBehavior(to, from, savedPosition) {
  if(savedPosition){
    return savedPosition
  }else{
    return { x: 0, y: 0 }
  }
}
</script>
```

## 在什么场景下会用到嵌套路由？
- 在页面点击不同的选项卡切换不同的路由来展示不同的内容时

## 如何获取路由传过来的参数？
- 一个路径参数使用":"，可以通过this.$route.params获取
- 路径中有查询参数"?xx:xx"，可以通过this.$route.query获取

## 怎么定义 vue-router 的动态路由
- router.addRoutes
```html
<div id="first">
    <router-link to="/a">老八一号</router-link>
    <router-link to="/b">老八二号</router-link>
    <router-link to="/c">老八三号</router-link>
    <router-link to="/d">老八四号</router-link>
    <router-view></router-view>
</div>
<script>
    let a={
        template:`<h1>奥里给 干了 兄弟们</h1>`
    };
    let b={
        template:`<h2>虽然不是同一个时间，但是是同一个撤所儿</h2>`
    };
    let c={
        template:`<h3>就吃老八秘制晓汉堡儿</h3>`
    };
    let d={
        template:`<h2>老八秘制晓汉堡  既便宜它还管饱</h2>`
    };

    let routerObj=new VueRouter({
        routes:[
            {path:'/a',component:a,name:'一号'},
            {path:'/b',component:b,name:'二号'}
        ]
    });
    routerObj.addRoutes([
        {path:'/c',component:c,name:'三号'},
        {path:'/d',component:d,name:'四号'}
    ]);
    let vm=new Vue({
        el:"#first",
        data:{},
        router:routerObj
    })
</script>
```
## 怎么实现路由懒加载呢？
- 像vue这种（spa）单页面应用，如果没有使用到懒加载，webpack打包的文件过大，造成进入首页时，加载的资源过多，时间过长，即使做了loading也不利于用户体验，而运用懒加载可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载事件，简单来说就是进入首页不用一次加载过多资源造成时间过长
- 1.vue的异步组件：resolve=>require(['需要异步加载的组件']，resolve)
- 2.es6的import方法：（）=>import(需要异步加载的组件)
- 3.webpack的 require.ensure： r => require.ensure([],()=>r( require(需要异步加载的组件))，chunkName)

## import与require区别
- require是 AMD规范引入方式
- import是 es6的一个语法标准
- require是运行时调用，所以require理论上可以运用在代码的任何地方
- import是编译时调用，所以必须放在文件开头
- require深拷贝
- import浅拷贝

## CommonJs,AMD和CMD
- CommonJs用在服务器端，AMD和CMD用在浏览器环境
- AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
- CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
- AMD:提前执行（异步加载：依赖先执行）+延迟执行
- CMD:延迟执行（运行到需加载，根据顺序执行）

## 你有看过vue-router的源码吗？说说看

## 说说vue-router完整的导航解析流程是什么？
- 1.导航被触发
- 2.在即将离开的组件里调用beforeRouteLeave守卫
- 3.调用全局前置守卫beforeEach守卫
- 4.在重用的组件里调用beforeRouteUpdate守卫 / 调用路由配置的beforeEnter守卫
- 5.解析异步路由组件
- 6.在被激活的组件里调用beforeRouteEnter
- 7.调用全局的beforeResolve守卫
- 8.导航被确认
- 9.调用全局的 afterEach 钩子
- 10.触发DOM更新
- 11.用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
## 如果让你从零开始写一个vue路由，说说你的思路
- hash模式：就是暴露install 和 router 然后初始化还有注册link view 组件监听hash变化。当hash改变的时候会出触发onhashchange，然后通过正则匹配找到对应的template，然后render。

## 路由之间是怎么跳转的？有哪些方式？
- 声明式  通过使用内置组件<router-link :to="/home">来跳转
- 编程式  通过调用router实例的push方法router.push({ path: '/home' })或replace方法router.replace({ path: '/home' })

## 如果vue-router使用history模式，部署时要注意什么？
- 要注意404的问题，因为在history模式下，只是动态的通过js操作window.history来改变浏览器地址栏里的路径，并没有发起http请求，当直接在浏览器里输入这个地址的时候，就一定要对服务器发起http请求，但是这个目标在服务器上又不存在，所以会返回404。
所以要在Ngnix中将所有请求都转发到index.html上就可以了。

## route和router有什么区别？
- route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。 而router是“路由实例对象”，包括了路由的跳转方法，钩子函数等。
## EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？
- 在组件销毁前 $off

## 怎么缓存当前打开的路由组件，缓存后想更新当前组件怎么办呢？
```js

beforeRouteLeave (to, from, next) {
  // 从列表页去到别的页面，如果不是详情页，则不缓存列表页
  if (to.name !== 'stockInfo') {
    this.$route.meta.keepAlive = false
  } else {
    this.$route.meta.keepAlive = true
  }
next()



<keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
</keep-alive>
<router-view v-if="!$route.meta.keepAlive" />
```