<template>
    <div>
        <h2>Scan</h2>
        <video id="camera" v-bind:srcObject.prop="stream" playsinline autoplay muted width="100%"></video>
        <div id="bar">
            <ShutterButton v-on:released="showPreview"></ShutterButton>
        </div>
        <Preview v-if="this.preview" v-bind:img="this.capture"></Preview>
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
            preview: undefined,
            capture: undefined
        }
    },
    methods: {
        showPreview: function(){
            this.preview = true
            const camera = document.getElementById('camera')
            const canvas = document.createElement('canvas') //エレメント作成

            canvas.width = camera.clientWidth
            canvas.height = camera.clientHeight

            const ctx = canvas.getContext("2d");
            ctx.drawImage(camera, 0, 0, camera.clientWidth, camera.clientHeight); //実質描画なし

            this.capture = canvas.toDataURL("image/png");

            this.stopVideo()
            
        },
        stopVideo: function(){
            const tracks = this.stream.getTracks()
            tracks.forEach(track => track.stop())
            document.getElementById('camera').srcObect = null
        }
    },
    created: async function(){
        this.stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: {exact: "environment"}
                //facingMode: "user"
            }
        })
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