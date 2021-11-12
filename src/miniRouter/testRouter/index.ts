import {ref,inject} from 'vue'
import RouterLink from 'RouterLink.vue'
import RouterView from 'RouterView.vue'
const ROUTER_KEY = '__router__'

function createRouter(options){
  //history为createWebHashHistory
  return new Router(options)
}

function useRouter(){
    //获取路由实例
    return inject(ROUTER_KEY)
}

function createWebHashHistory(){
    function bindEvent(fn){
        //绑定hash事件
        //hash自动执行fn钩子
        window.addEventListener('hashchange',fn)
    } 
    //hash
    //获取hash：window.location.hash.slice(1)
    return {
      bindEvent,
      url:window.location.hash.slice(1) || '/'
    }
}

class Router{
  history: any
  routes:any
  current:any
  constructor(options){
    this.history = options.history
    this.routes = options.routes
    this.current = ref(this.history.url)
    this.history.bindEvent(()=>{
      this.current.value = window.location.hash.slice(1)
    })
  }
  //注册vue组件
  install(app:any){
    //app为vue实例
    //vue全局注册route实例
    app.provide(ROUTER_KEY,this)
    //注册router-link和router-view组件
    app.component('router-link',RouterLink)
    app.component('router-view',RouterView)
  }
}

export {createRouter,createWebHashHistory,useRouter}