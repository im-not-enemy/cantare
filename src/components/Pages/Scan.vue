<template>
    <div>
        <h1>Scan</h1>
        <video id="camera" v-bind:srcObject.prop="stream" autoplay width="100%" heigth="100%"></video>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            stream: undefined
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

</style>