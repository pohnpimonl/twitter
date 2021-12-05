import VueRouter from 'vue-router'
import Begin from './components/Begin.vue'
import Register from './components/Register.vue'
import Loginn from './components/Loginn.vue'
import Mainpage from './components/Mainpage.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Suggested from './components/Suggested.vue'

const routes = [
    { path: '/begin', component: Begin },
    { path: '/register', component: Register },
    { path: '/login', component: Loginn },
    { path: '/mainpage', component: Mainpage },
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/suggested', component: Suggested },
]

const router = new VueRouter({
    routes: routes,
    mode: 'history',
})

export default router