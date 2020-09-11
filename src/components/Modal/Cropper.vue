<template>
    <div id="app">
        <cropper
            :src="this.img"
            :stencil-props="{aspectRaito: this.aspectRaito}"
            @change="this.change"
        ></cropper>
        <div id="bar">
            <CropButton></CropButton>
        </div>
    </div>
</template>

<script>
    import {Cropper} from 'vue-advanced-cropper' 
    import CropButton from '../Parts/CropButton'

    export default {
        props: ["img"],
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
                console.log(coordinates,canvas)
            },
            gcd(a,b){
                if (b === 0) return a
                return this.gcd(b,a%b)
            }
        },
        components: {Cropper,CropButton}
    }
</script>

<style scoped>
#app {
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