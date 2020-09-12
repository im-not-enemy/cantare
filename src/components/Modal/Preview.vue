<template>
    <div id="app">
        <img :src="this.img">
        {{this.result}}
        <div id="bar">
            <SubmitButton @submit="this.send"></SubmitButton>
        </div>
    </div>
</template>

<script>
    import SubmitButton from '../Parts/SubmitButton'
    import setting from '../../conf/setting'
    import moment from 'moment'
    import axios from 'axios'
    import https from 'https'

    export default {
        props: ["canvas"],
        data(){
            return {
                img: this.canvas.toDataURL("image/png"),
                result: undefined
            }
        },
        methods: {
            send(){
                const dataurl = this.canvas.toDataURL("image/png");
                const binary = atob(dataurl.split(',')[1])
                const buffer = new Uint8Array(binary.length)
                for (let i=0; i<binary.length; i++){
                    buffer[i] = binary.charCodeAt(i)
                }
                const blob = new Blob([buffer.buffer],{type:"image/png"})

                const formdata = new FormData()
                const now = moment().format('YYYYMMDDHHmmss')
                formdata.append('musicSheetImage',blob,`${now}.png`)

                axios.post(`${setting.server}/scan/upload`,formdata,{
                    headers:{
                        'content-type':'multipart/form-data'
                    }
                })
                .then(res=>{
                    this.result = res.data
                })
                .catch(err=>{
                    this.result = err
                })
            }
        },
        components: {SubmitButton}
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