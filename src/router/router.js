import Vue from 'vue'
import Router from 'vue-router'

import studio from '../components/Pages/Studio.vue'
import scan from '../components/Pages/Scan.vue'
import menulist from '../components/Pages/MenuList.vue'
import training from '../components/Pages/Training.vue'
import analysis from '../components/Pages/Analysis.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/studio',
            component: studio
        },
        {
            path: '/scan',
            component: scan
        },
        {
            path: '/menulist',
            component: menulist
        },
        {
            path: '/training',
            component: training
        },
        {
            path: '/analysis',
            component: analysis
        }
    ]
})