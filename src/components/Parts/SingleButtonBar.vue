<template>
    <div id="app">
        <CropButton v-if="this.mode==='crop'" @click="$emit('click')"></CropButton>
        <ShutterButton v-if="this.mode==='shutter'" @click="$emit('click')"></ShutterButton>
        <SubmitButton v-if="this.mode==='submit'" @click="$emit('click')"></SubmitButton>
    </div>
</template>

<script>
import CropButton from './CropButton'
import ShutterButton from './ShutterButton'
import SubmitButton from './SubmitButton'

export default {
    props: ["mode"],
    components: {CropButton,ShutterButton,SubmitButton}
}
</script>

<style scoped>
#app {
    position: fixed;
    z-index: 75;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 100px; /*要検討*/
    background: #CCFFCC;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>