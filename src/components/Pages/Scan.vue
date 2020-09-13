<template>
    <div id="app">
        <div id="content">
            <video id="camera" v-bind:srcObject.prop="stream" playsinline autoplay muted width="100%"></video>
        </div>
        <div class="invisible">
            <button id="switchCam" @click="this.switchCam">switchCam</button>
        </div>
        <ButtonBar :mode="'shutter'" @click="showCropper"></ButtonBar>
        <Cropper v-if="this.cropper" v-bind:img="this.capture"></Cropper>
    </div>
</template>

<script>
import ButtonBar from '../Parts/ButtonBar'
import Cropper from '../Modal/Cropper'

export default {
    components: {
        ButtonBar,Cropper
    },
    data: function(){
        return {
            stream: undefined,
            cropper: undefined,
            capture: undefined,
            activeCam: "environment"
        }
    },
    methods: {
        showCropper: function(){
            this.cropper = true
            const camera = document.getElementById('camera')
            const canvas = document.createElement('canvas') //エレメント作成

            canvas.width = camera.clientWidth
            canvas.height = camera.clientHeight

            const ctx = canvas.getContext("2d");
            ctx.drawImage(camera, 0, 0, camera.clientWidth, camera.clientHeight); //実質描画なし

            this.capture = canvas.toDataURL("image/png");

            this.stopVideo()
            
        },
        startVideo(){
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    //facingMode: {exact: "environment"}
                    //facingMode: "environment"
                    facingMode: this.activeCam
                    //facingMode: "user"
                }
            }).then(stream => this.stream = stream)
        },
        switchCam(){
            this.activeCam === "environment"
            ? this.activeCam = "user"
            : this.activeCam = "environment"
            this.stopVideo()
            this.startVideo()
        },
        stopVideo: function(){
            const tracks = this.stream.getTracks()
            tracks.forEach(track => track.stop())
            document.getElementById('camera').srcObect = null
        }
    },
    created: async function(){
        this.startVideo()
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
    background: #DDFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
}
.invisible {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 55;
    background: rgba(45,45,45, 0.1);
}
#switchCam {
    position: absolute;
    right: 5px;
    top: 5px;
}
</style>