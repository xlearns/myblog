
# vue-router
## vue-router钩子函数有哪些？都有哪些参数？
## vue-router是用来做什么的？它有哪些组件？

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
- 路由的持久化，而且页面刷新之后store里面的数据也清空了。为了解决上述问题，我就在登录后获取到的菜单数据列表存在localstorage里


## active-class 是哪个组件的属性？
- active-class 是 vue-router 模块的 router-link 组件的属性
- 当router-link标签被点击时将会应用这个样式

# 嵌套路由怎么定义
- 使用 children 定义嵌套路由

## vue-router怎么重定向页面？
## vue-router怎么配置404页面？
## 切换路由时，需要保存草稿的功能，怎么实现呢？
## vue-router路由有几种模式？说说它们的区别？
## 说说你对router-link的了解
## vue-router如何响应路由参数的变化？

## 切换到新路由时，页面要滚动到顶部或保持原先的滚动位置怎么做呢？

## 在什么场景下会用到嵌套路由？
## 如何获取路由传过来的参数？
## 怎么定义 vue-router 的动态路由? 怎么获取传过来的值
## 怎么实现路由懒加载呢？
## 在vue组件中怎么获取到当前的路由信息？
## 如果让你从零开始写一个vue路由，说说你的思路
## 你有看过vue-router的源码吗？说说看

## 路由之间是怎么跳转的？有哪些方式？
## 如果vue-router使用history模式，部署时要注意什么？
## route和router有什么区别？

## EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？
## 怎么缓存当前打开的路由组件，缓存后想更新当前组件怎么办呢？
