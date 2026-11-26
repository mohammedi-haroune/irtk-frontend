import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function route (name) {
  return {
    path: '/' + name,
    name: name,
    component: () => import(`./views/${name.charAt(0).toUpperCase() + name.slice(1)}.vue`)
  }
}

export default new Router({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    route('inspire'),
    route('welcome'),
    route('about'),
    route('corpus'),
    route('browser'),
    route('find'),
    route('select'),
    route('boolean'),
    route('vector'),
    // Global redirect for 404
    { path: '*', redirect: '/welcome' }
  ]
})
