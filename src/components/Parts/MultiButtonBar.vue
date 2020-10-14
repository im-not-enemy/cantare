<template>
    <div id="app">
        <PlayButton v-if="this.mode.includes('play')" @click="$emit('play')"></PlayButton>
        <SubmitButton v-if="this.mode.includes('submit')" @click="$emit('submit')"></SubmitButton>
    </div>
</template>

<script>
import SubmitButton from './SubmitButton'
import PlayButton from './PlayButton'

export default {
    props: {
        "mode": Array
    },
    components: {SubmitButton,PlayButton}
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
    pointer-events: none;
}
</style>