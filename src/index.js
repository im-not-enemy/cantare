import Vue from 'vue'
import App from './components/App.vue'
import router from './router/router.js'
import touch from 'vue2-touch-events'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(touch)
 
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App }
})