## 你有写过vuex中store的插件吗？
[官方文档](https://vuex.vuejs.org/zh/guide/plugins.html#%E5%9C%A8%E6%8F%92%E4%BB%B6%E5%86%85%E6%8F%90%E4%BA%A4-mutation)
```js
function createWebSocketPlugin(socket){
 return store => {
     store.commit('receiveData', data)
    // socket.on('data', data => {
    //   store.commit('receiveData', data)
    // })
    // store.subscribe(mutation => {
    //   if (mutation.type === 'UPDATE_DATA') {
    //     socket.emit('update', mutation.payload)
    //   }
    // })
  }
}
const plugin = createWebSocketPlugin(socket)

const store = new Vuex.Store({
  state,
  mutations,
  plugins: [plugin]
})
```

## 你有使用过vuex的module吗？主要是在什么场景下使用？
- 把状态全部集中在状态树上，非常难以维护。按模块分成多个module，状态树延伸多个分支，模块的状态内聚，主枝干放全局共享状态

## vuex中actions和mutations有什么区别？
- mutations可以直接修改state，但只能包含同步操作，同时，只能通过提交commit调用(尽量通过Action或mapMutation调用而非直接在组件中通过this.$store.commit()提交)
- actions是用来触发mutations的，它无法直接改变state，它可以包含异步操作，它只能通过store.dispatch触发

## vuex使用actions时不支持多参数传递怎么办？
- Object挂载

## 你觉得vuex有什么缺点？
- 页面刷新时会使state的数据初始化，也就是说刷新页面数据会丢失

## vuex怎么知道state是通过mutation修改还是外部直接修改的？
- 默认严格模式下：Vuex 中修改 state 的唯一渠道就是执行 commit('xx', payload) 方法，其底层通过执行 this._withCommit(fn) 设置_committing 标志变量为 true，然后才能修改 state，修改完毕还需要还原_committing 变量。外部修改虽然能够直接修改 state，但是并没有修改_committing 标志位，所以只要 watch 一下 state，state change 时判断是否_committing 值为 true，即可判断修改的合法性。

## 请求数据是写在组件的methods中还是在vuex的action中？
- 根据业务场景划分，如果该请求数据的方法是多个视图共享的话，则写在action中，如果是当前视图所用，则写在组件的methods中
## 怎么监听vuex数据的变化？
```js
//利用计算属性
  computed: {
        nowData() {
           return this.$store.state.nowData;
        }
  },

  //监听执行
  watch: {
      nowData(val) {
         // doSomeThing
      }
  },

```
## vuex的action和mutation的特性是什么？有什么区别？
Action
- 1.可以包含任意异步操作
- 2.它提交的是mutation，而不是直接变更状态
Mutation
- 1.唯一一个可以修改state的途径
- 2.必须是同步函数

## 页面刷新后vuex的state数据丢失怎么解决？
- 监听浏览器刷新前的事件，在浏览器刷新之前就把vuex里的数据保存至sessionStorage中，刷新成功后如果异步请求的数据还没返回则直接获取sessionStorage里的数据，否则获取vuex里的数据。

## vuex的state、getter、mutation、action、module特性分别是什么？
- state, 状态初始化, 并实施观察
- getter, 获取数据用于view或data中使用
- mutation: 内部处理state变化
- action: 处理外部交互
- module: 模块化

## 你理解的vuex是什么呢？哪些场景会用到？不用会有问题吗？有哪些特性？
- 我当成全局变量来用的，使用Vue开发的过程中，我们经常会遇到一个状态可能会在多个组件之间使用，比如我们在做项目时使用到的用户的信息，什么昵称、头像这些，这些信息会在不同的组件用到，一旦改变这些状态，我们希望其他组件也跟随变化，比如用户充值了100元，或者改变了昵称，所以这个时候就需要状态管理模式来集中管理，关于Vuex的详细介绍可以移步到官网。

## 有用过vuex吗？它主要解决的是什么问题？推荐在哪些场景用？
- 解决两个问题
多个组件依赖于同一状态时，对于多层嵌套的组件的传参将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
来自不同组件的行为需要变更同一状态。以往采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。
- 什么时候用Vuex？
当项目遇到以下两种场景时
多个组件依赖于同一状态时。
来自不同组件的行为需要变更同一状态。
