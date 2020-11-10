import Vue from 'vue'
import Router from 'vue-router'

import studio from '../components/Pages/Studio/Main.vue'
import menulist from '../components/Pages/MenuList/Main.vue'
import training from '../components/Pages/Training/Main.vue'
import analysis from '../components/Pages/Analysis/Main.vue'

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
            path: '/training/random/all',
            component: training,
            props: {
                mode: 'random-all'
            }
        },
        {
            path: '/training/random/inprogress',
            component: training,
            props: {
                mode: 'random-inprogress'
            }
        },
        {
            path: '/analysis',
            component: analysis
        }
    ]
})