import Vue from 'vue'
import Router from 'vue-router'

import studio from '../components/Pages/Studio/Main.vue'
import menulist from '../components/Pages/MenuList/Main.vue'
import training from '../components/Pages/Training/Main.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/studio',
            component: studio
        },
        {
            path: '/menulist',
            component: menulist
        },
        {
            path: '/training',
            component: training
        },
    ]
})