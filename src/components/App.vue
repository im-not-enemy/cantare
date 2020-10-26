<template>
    <div id="app">
        <div class="header">
            <button @click="show=!show">
                <font-awesome-icon icon="bars"/>
            </button>
        </div>
        <transition>
            <div class="side-bar" v-show="show" v-touch:swipe.left="hide">
                <div><router-link to="/studio">Studio</router-link></div>
                <div><router-link to="/menulist">Menulist</router-link></div>
                <div><router-link to="/training">Training</router-link></div>
                <button @click="enable" v-if="!(full)">
                    <font-awesome-icon icon="expand"/>
                </button>
                <button @click="disable" v-if="full">
                    <font-awesome-icon icon="compress"/>
                </button>
            </div>
        </transition>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    data: function(){
        return {
            show: false,
            full: false
        }
    },
    methods: {
        hide: function(){
            this.show= false
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
.v-enter-active, .v-leave-active {
    transition-duration: 0.3s;
}
.v-enter, .v-leave-to {
    transform: translateX(-200px);
    opacity: 0;
}
a {
    color: #444444;
    text-decoration: none;

}
* {
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}
.side-bar {
    background: white;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    padding: 45px 5px 5px 5px;
    height: 100vh;
    width: 200px;
    z-index: 100;
}
.side-bar > * {
    margin: 10px;
    font-size: 16px;
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
    background: white;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    margin: 0px;
    padding: 3px;
    z-index: 150;
    display: flex;
}
.header > button {
    font-size: 16px;
}
</style>