import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../views/mange/login";
import home from "../views/mange/home";
import stuInfo_home from "../views/mange/stuInfo_home";
import SignUp from "../views/user/SignUp";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect:'/signUp'
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        children:[
            {
                path:'/stuInfo',
                name:'stuInfo',
                component:stuInfo_home
            }
        ]
    },
    {
        path: '/signUp',
        name: 'SignUp',
        component: SignUp
    }

]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next)=>{
    if(!(to.path=='/'||to.path=='/signUp'||to.path=='/login')){
        if(sessionStorage.getItem('login')) return next();
        else return next('/login')
    }
    next()
})

export default router
