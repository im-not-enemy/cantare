<template>
    <div id="app">
        <SubmitButton v-if="this.mode==='submit'" @click="$emit('click')"></SubmitButton>
    </div>
</template>

<script>
import SubmitButton from './SubmitButton'

export default {
    props: ["mode"],
    components: {SubmitButton}
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