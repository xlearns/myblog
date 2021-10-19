- [前端异常监控](https://github.com/xlearns/myblog/issues/1)
- [双链表](https://github.com/xlearns/myblog/issues/2)
- [chaining](https://github.com/xlearns/myblog/issues/3)
## 函数取整
- ~、>>、<<、>>>、|来取整
```js
console.log(~~2.2 == 2.2>>0)    //true
console.log(~~11.71)            // 11
console.log(11.71 >> 0)         // 11
console.log(11.71 << 0)         // 11
console.log(11.71 | 0)          // 11
console.log(11.71 >>> 0)        // 11
```

## 高级函数【基础为函数是一等公民first classs】

可以把函数当参数也可以当返回值
- 可以把函数作为参数传递给另外一个函数
- 可以把函数作为另外一个函数的返回结果

## 高级函数的意义
- 抽象通用问题
- 类似声明式，how->what【只管结果,不用考虑细节】

## 扩展trim函数
```js
//trim
function trim(string,option){
    option = option||{
        start:false,
        end:false,
        chars:'',
    } 
    if(typeof option!='object'||option==null){
        throw new Error('option must object')
    }
    if(!string){
        return string || ''
    }
    if(option.start){
        return string.replace(/^\s+/mg,'')
    }else if(option.end){
        return string.replace(/\s+$/mg,'')
    }else if(option&&!option.start&&!option.end&&option.chars){
        return string.trim().split(option.chars).filter(v=>v!='').toString() 
    }else{
        return string.trim()
    }
}
console.log(trim(' 😀abc😀  ',{chars:'😀'}))
```

## 实现lodash zip函数
```js
//zip
function zip(...args){
    let result = []
    args.forEach((v)=>{
            v.forEach((vv,index)=>{
                //初始化
                result[index] = result[index]||[]
                result[index].push(vv)
            })
    })
    return result
}
console.log(zip(['a', 'b','c'], [1, 2,3], [true, false],['哈哈', 'dj'],['name','ss','sss','ssss','sssss']))
```
## 实现slice函数
```js
function mySlice(array,start,end){
    let length = array == null ? 0:array.length
    if(!length)[]
    //初始化
    start = start == null ? 0 : start
    end = end === undefined ? length : end
    if(start<0){
        start = -start > length ? 0 : (length + start)
    }
    end = end>length?length:end;
    if(end<0){
        end +=length
    }
    length = start > end ? 0 : ~~(end - start)
    start = ~~start
    //重0开始
    let index = -1
    const result = new Array(length)
    while (++index < length) {
        result[index] = array[index + start]
    }
    return result
}
var test = [1,2,3,4,5]
console.log(mySlice(test,2))

```

## 实现forEach函数

```js
Array.prototype.myForEach=function(fn,_this){
  let arr = this;
  _this = _this?_this:window
  for(let i=0;i<arr.length;i++){
      fn.appley_this,[arr[i],i,arr])
  }
}
```
## 实现filter函数
```js
Array.prototype.myFilter=function(fn,_this){
  let arr = this;
  let res = []
   _this = _this?_this:window
  for(let i=0;i<arr.length;i++){
     if(fn.apply(_this,[arr[i],i,arr])){
       res.push(arr[i])
     }
  }
  return res
}
```
## 实现reduce函数
- 应用：汇总、比如lodash的flow、flowRight的函数组合就是通过reduce实现的

```js 
Array.prototype.myReduce=function(fn,init,_this){
  let arr = this;
    init = init?init:0
   _this = _this?_this:window
   for(let i=0;i<arr.length;i++){
     init = fn.apply(_this,[init,arr[i],i,arr])
   }
   return init
}
```

## 实现once函数 
```js
function once(fn,_this){
  _this = _this?_this:window;
  let isRun = false
  return function(){
    if(!isRun){
    isRun = true
    return fn.apply(_this,arguments)
    }
  }
}
```

## 实现map函数 
```js
Array.prototype.myMap=function(fn,_this){
  let arr = this
  _this = _this?_this:window
  let res = []
  for(let i=0;i<arr.length;i++){
    res.push(fn.apply(_this,[arr[i],i,arr]))
  }
  return res
}
```
## 实现every函数 
```js
Array.prototype.myEvery=function(fn,_this){
 let arr = this
  _this = _this?_this:window
  let res = true
  for(let i=0;i<arr.length;i++){
    if(!fn.apply(_this,[arr[i],i,arr])){
      res = false
    }
  }
  return res
}
```
## 实现some函数 
```js
Array.prototype.mySome=function(fn,_this){
 let arr = this
  _this = _this?_this:window
    let res = false
  for(let i=0;i<arr.length;i++){
    if(fn.apply(_this,[arr[i],i,arr])){
      res = true
    }
  }
  return res
}
```

## 闭包
 - 固化参数，比如我想固化第一个参数。场景，第一个函数为类别，第二个为任意，通过固化参数可以避免重复定义的问题
 - 发生位置：打开控制面板，再source打上断点，然后再右侧的crosure中可以看见闭包。当然也可以通过console.dif查看闭包作用域

## 纯函数
 - 函数的执行过程完全由输入的参数决定且对应
 - 函数不会修改任何外部状态【包括全局变量和参数对象，由于纯函数不需要保存计算的中间结果，所以变量是不可变的“无状态”】
 - 好处：可缓存、方便调试、单元测试可以覆盖100%、并行处理【纯函数不需要访问共享内存数据】
 - eg：slice【copy 数组】为纯函数、splice【会修改原数组】为非纯函数
## 实现lodash的memoize方法
```js
function memoize(fn,_this){
  let cache = {}
  _this = _this?_this:window
  return function(){
     let key = JSON.stringify(arguments)
     if(!cache[key]){
       //把结果缓存
       cache[key] = fn.apply(_this,arguments)
     }
     return cache[key]
  }
}

```
 ## lodash 【纯函数】
 - 安装
    - 初始化package.json `npm init -y`
    - 安装 `npm install lodash`
 - 常用方法：last、first、toUpper、reverse、each、includes、find、findIndex
 - 函数柯里化：curry
 - 函数组合：flow、flowRight
```js
const _  = require('lodash')
//功能函数
const reverse = arr=>arr.reverse()
const first = arr=>arr[0]
const toUpper = arr=>arr.toUpperCase()

//组合
const f = _flowRight(toUpper,first,reverse)
//测试
console.log(f(['one','two','three']))

//简单写法
const f = _flowRight(_.toUpper,_.first,_.reverse)
console.log(f(['one','two','three']))

//满足结合律 
const f = _flowRight(_flowRight(_.toUpper,_.first),_.reverse)
console.log(f(['one','two','three']))
```
 - memoize:记忆函数
 - fp模块：
 - lodash原理
 - debounce
 ```js
//debounce

 ```
## 柯里化 【Curry】
- 原理把单参合并为一个参数
- 优点：固化参数、一种对参数缓存的技术、减少函数颗粒度、将多元函数转换为一元、组合使用函数
- 实现一个curry【lodash源码】
```js
//通用柯里化
function curry(fn,_this){
   _this = _this?_this:window 
  return function curry_handle(...args){
    //fn.length 函数形参的长度
    //arg.length 函数实参的长度
    if(fn.length<=args.length){
        return fn.apply(_this,args)
    }else{
      return function (...next){
        return curry_handle.apply(_this,args.concat(next))
      }
    }
  }
}
// 测试
function test(a,b,c){
  return a+b+c
}
var testa = curry(test)
console.log(testa(1)(2)(3))
console.log(testa(1,2,3))
console.log(testa(1,2)(3))
```

## 实现lodash的组合函数源码
- 调试：可以写一个log函数，类似node中间件
```js
const trace = _.curry((tag, v)=>[
  console.log(tag,v)
  return v  
])
```
- 要使用函数组合，必须要满足结合律
```js
function flowRight(...fns){
  //通过lodash观察可以知道返回值为一个函数
  return function(value){
    //通过reduce来实现函数汇总
    return fns.reverse().reduce((pre,cur)=>{
       //上一个值是当前值的参数
        return cur(pre)
    },value)
  }
}

function flow(...fns){
  return function(value){
    return fns.reduce((pre,cur)=>{
       //上一个值是当前值的参数
        return cur(pre)
    },value)
  }
}

//测试

//功能函数
const reverse = arr=>arr.reverse()
const first = arr=>arr[0]
const toUpper = arr=>arr.toUpperCase()

//组合
const f = flowRight(toUpper,first,reverse)
//结果
console.log(f(['one','two','three']))
```

## vue router实现原理

# 拉钩vue3 源码
- vue  = 响应式 + 模板解析 + 虚拟DOM + 组件
## vue2.x在created和data声明数据的区别?
- `唯一区别为在created声明的变量不会被挂载Object.defineProperty也就是不是响应式，在一些不需要响应式的数据就可以写在created中`
## vue3.x优化
- 体积变小，引入tree shaking通过在编译阶段做静态分析，找到没有引入的模块打上标记，包体积越小，意味着网络传输时间越短，js引擎解析包的速度也越快
- 数据劫持，vue2.x采用的是Object.defineProperty则就会存在问题，拦截不了对象属性的添加和删除，虽然vue2.x为了解决问题提供了$set、$delete方法，其实，对于层级比较浅的对象，Object.defineProperty的速度是比proxy要快的，但是Odp对嵌套层级比较深的对象，需要递归便利这个对象，执行Object.defineProperty把每一层对象都变成响应式。这样就会造成相当大的内存负担。但是proxy其实也监听不到内部深层次对象的变化，不过vue3.x采用在getter中去递归响应式，这样的好处是只有真正访问到的内部才会变成响应式，而不是像2.x一样无脑递归。
- 编译优化
    - vue2.x：从new Vue->渲染成DOM的流程为：`1.new Vue 2. init 3. $mount 4. compile 5. render 6. vnode 7 patch 8 DOM`其中响应式就发生在init阶段
    - 
- API优化：composition API 
   - vue2.x 为option
   - 改完类似reacthooks
## reactive、computed、effect
```js
let config = {
    get(obj,key){
        const res = Reflect.get(obj,key)
        track(obj,key)
        return typeof res =='object' ?reactive(res):res;
    },
    set(obj,key,value){
        let inof = {oldValue:Reflect.get(obj,key),newValue:value}
        Reflect.set(obj,key,value)
        trigger(obj,key,inof)
    }
}

function reactive(obj){
    return new Proxy(obj,config)
}

// effect
let stackEffect = []
// dep
let weakmap = new WeakMap()

function track(obj,key){
    let depsMap = weakmap.get(obj)
    let effect = stackEffect[stackEffect.length - 1]
    if(!effect)return
    if(!depsMap){
        depsMap = new Map()
        weakmap.set(obj,depsMap)
    }
    let deps = depsMap.get(key)
    if(!deps){
        deps = new Set()
        depsMap.set(key,deps)
    }
    if(!deps.has(effect)){
        deps.add(effect)
        effect.deps.push(effect)
    }
}

function trigger(obj,key,value){
    let depsMap = weakmap.get(obj)
    let effects = new Set()
    let computed = new Set()
    if(key){
        let deps = depsMap.get(key)
        deps.forEach(effect=>{
            if(effect.computed){
                computeds.add(effect)
            }else{
                effects.add(effect)
            }
        })
    }
    effects.forEach((effect)=>effect())
    computed.forEach((effect)=>effect())
}

function effect(fn,op={}){
    let o = createEffect(fn,op)
    if(!o.lazy){
        o()
    }else{
        return o
    }
}
function createEffect(fn,op){
    const effect = function(...args){
        return run(effect,fn,args)
    }
    effect.lazy = op.lazy
    effect.computed = op.computed
    effect.deps = []
    return effect
}
function run(effect,fn,ages){
    if(stackEffect.indexOf(effect)==-1){
        try{    
            stackEffect.push(effect)
            return fn(ages) 
        }finally{
            stackEffect.pop()
        }
    }
}
function computed(fn){
    const runner = effect(fn,{lazy:true,compued:true})
    return {
        effect:runner,
        get value(){
            return runner()
        }
    }
}

```
## js基本数据类型如何判断
- number、stirng、boolean、bigint、symbol、undefined、null

## 如何理解html语义化

## 什么是BFC

## 响应式布局

## 如何实现居中
- flex
- margin
- position

## Symbol
- new Symbol 报错
- Symbol应用
- Symbol.iterator
```js
let o = {}
o[Symbol.iterator] = function(){
  let i = 0 
  return {
    next:function(){
      return {
        value:i++,
        done:i>10
      }
    }
  }
}
```

## this指向
- 

## 闭包
- 

## reduce实现

## compose实现

## apply、bind、call实现

## new实现

## 继承

## class继承与原型继承区别

## 宏任务 微任务

## setTImeout与requestAnmationframe区别

## try{}catch{}、onerror、addEventListener('error')、unhandlerrejection

## promise异常

## promise 异步实现

## promise穿透实现

## promise then链式调用实现

## promise静态方法实现

## 为什么给对象添加的方法能用在基本类型上？
- .运算符提供了装箱操作，他会根据基础数据类型，创建一个临时的对象，使得我们可以在基础数据类型上调用对于的对象方法

