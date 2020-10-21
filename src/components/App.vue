<template>
    <div id="app">
        <div class="header">
            <button @click="this.show">@</button>
        </div>
        <div id="show-links" v-show="seen" v-touch:swipe.left="this.hide">
            <router-link to="/studio">studio</router-link><br> 
            <router-link to="/menulist">menulist</router-link><br>
            <router-link to="/training">training</router-link><br> 
            <button @click="this.enable" v-if="!(this.full)">full: enable</button>
            <button @click="this.disable" v-if="this.full">full: disable</button>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    data: function(){
        return {
            seen: true,
            full: false
        }
    },
    methods: {
        hide: function(){
            this.seen = false
        },
        show: function(){
            this.seen = true
        },
        enable(){
            document.getElementById('app').requestFullscreen()
            this.full = true
        },
        disable(){
            document.exitFullscreen()
            this.full = false
        },
    }
}
</script>

<style scoped>
#show-links {
    background: gray;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100px; /* 要検討 */
    opacity: 0.5; /* 要検討 */
    z-index: 150;
}
router-view {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 0;
}
.header {
    position: fixed;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    margin: 0px;
    padding: 0px;
    background: gray;
    z-index: 100;
}
</style>