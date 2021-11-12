import { createRouter, createWebHashHistory} from './testRouter/index'
import HelloWorld from '@/components/HelloWorld.vue'

const routes = [ { path: '/users/:id', component: HelloWorld }]
createRouter({ history: createWebHashHistory(), routes})