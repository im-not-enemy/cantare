<template>
    <div>
        <h2>Scan</h2>
        <video id="camera" v-bind:srcObject.prop="stream" autoplay width="100%"></video>
        <div id="bar">
            <ShutterButton v-on:released="showPreview"></ShutterButton>
        </div>
        <Preview v-if="this.preview"></Preview>
    </div>
</template>

<script>
import ShutterButton from '../Parts/ShutterButton'
import Preview from '../Modal/Preview'

export default {
    components: {
        ShutterButton,Preview
    },
    data: function(){
        return {
            stream: undefined,
            preview: undefined
        }
    },
    methods: {
        showPreview: function(){
            this.preview = true
        }
    },
    created: async function(){
        this.stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: {exact: "environment"}
            }
        })
        this.camera.requestFullscreen()
    }
}
</script>

<style scoped>
#bar {
    position: fixed;
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