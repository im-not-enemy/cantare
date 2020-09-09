<template>
    <div>
        <div id="show-links" v-show="seen" v-touch:swipe.left="this.hide">
            <router-link to="/studio">studio</router-link><br> 
            <router-link to="/scan">scan</router-link><br>
            <router-link to="/menu">menu</router-link><br>
            <router-link to="/training">training</router-link><br> 
            <router-link to="/analysis">analysis</router-link>
        </div>
        <div id="hide-links" v-show="!seen" v-touch:swipe.right="this.show"></div>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    data: function(){
        return {
            seen: true
        }
    },
    methods: {
        hide: function(){
            this.seen = false
        },
        show: function(){
            this.seen = true
        }
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
    z-index: 100;
}
#hide-links {
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100px; /* 要検討 */
    opacity: 0.5; /* 要検討 */
    z-index: 100;
}
router-view {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
}
</style>