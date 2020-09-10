<template>
    <div id="app">
        <img v-bind:src="this.img">
    </div>
</template>

<script>
export default {
    props: ['img'] //base64
}
</script>

<style scoped>
#app {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 50;
    background: #DDFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>