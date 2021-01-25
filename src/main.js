import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from "element-ui";
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://119.3.13.230:8000/1'

Vue.prototype.$Message=Message
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
