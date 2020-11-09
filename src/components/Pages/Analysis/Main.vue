<template>
    <div id="app">
        <h1>Analysis</h1>
        <PieContainer></PieContainer>
    </div>
</template>

<script>
import PieContainer from './Charts/PieContainer.vue'

export default {
    components: {
        PieContainer
    }
}
</script>

<style scoped>
#app {
    position: fixed;
    top: 30px;
    padding-top: 10px;
    left: 0;
    height: 100vh;
    width: 100%;
    background: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>