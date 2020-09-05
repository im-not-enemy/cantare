import Vue from 'vue'
import App from './components/App.vue'
import router from './router/router.js'

new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App }
})