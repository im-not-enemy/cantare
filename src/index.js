import Vue from 'vue'
import App from './components/App.vue'
import router from './router/router.js'
import touch from 'vue2-touch-events'

Vue.use(touch)

new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App }
})