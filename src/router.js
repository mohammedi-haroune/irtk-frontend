import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

function route (name) {
  return {
    path: '/' + name,
    name: name,
    component: resolve => {
      console.log(`./views/${name.charAt(0).toUpperCase() + name.slice(1)}.vue`)
      import(`./views/${name.charAt(0).toUpperCase() + name.slice(1)}.vue`).then(resolve)
    }
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    route('inspire'),
    route('welcome'),
    route('about'),
    route('corpus')
  ]
})
