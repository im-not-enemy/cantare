<template>
    <div id="app">
        <div id="content">
            <cropper
                :src="this.img"
                :stencil-props="{aspectRaito: this.aspectRaito}"
                @change="this.change"
            ></cropper>
        </div>
        <ButtonBar :mode="'crop'" @click="showPreview()"></ButtonBar>
        <Preview v-if="this.preview" :canvas="this.croppedCanvas"></Preview>
    </div>
</template>

<script>
    import {Cropper} from 'vue-advanced-cropper' 
    import ButtonBar from '../Parts/SingleButtonBar'
    import Preview from '../Modal/Preview'

    export default {
        props: ["img"],
        data(){
            return {
                preview: undefined,
                croppedCanvas: undefined
            }
        },
        computed: {
            aspectRaito(){
                const img = new Image()
                img.onload = function(){}
                img.src = this.img
                const gcd = this.gcd(img.height,img.width)
                return `${img.height/gcd}/${img.width/gcd}`
            }
        },
        methods: {
            change({coordinates,canvas}){
                this.croppedCanvas = canvas
            },
            gcd(a,b){
                if (b === 0) return a
                return this.gcd(b,a%b)
            },
            showPreview(){
                this.preview = true
            }
        },
        components: {Cropper,ButtonBar,Preview}
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
</style>