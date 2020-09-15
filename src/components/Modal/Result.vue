<template>
    <div id="app">
        <div id="content">
            <div id="paper"></div><br>
            <div>{{this.text}}</div>
            <div v-if="error">{{this.error}}</div>
        </div>
    </div>
</template>

<script>
import abcjs from 'abcjs'

export default {
    props: ['text','error'],
    mounted(){
        abcjs.renderAbc("paper", this.text)[0];
    }
}
</script>

<style scoped>
#content {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 50;
    background: #feddff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>