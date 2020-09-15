<template>
    <div id="app">
        <div id="content">
            <img :src="this.img">
        </div>
        <ButtonBar :mode="'submit'" @click="this.send"></ButtonBar>
        <Loading v-if="this.loading"></Loading>
        <Result v-if="this.result" :text="this.text" :error="this.error"></Result>
    </div>
</template>

<script>
    import ButtonBar from '../Parts/SingleButtonBar'
    import Loading from './Loading'
    import Result from './Result'
    import setting from '../../conf/setting'
    import moment from 'moment'
    import axios from 'axios'
    import https from 'https'

    export default {
        props: ["canvas"],
        data(){
            return {
                img: this.canvas.toDataURL("image/png"),
                result: false,
                text: undefined,
                loading: false,
                error: undefined
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

                this.loading = true
                axios.post(`${setting.server}/scan/upload`,formdata,{
                    headers:{
                        'content-type':'multipart/form-data'
                    }
                })
                .then(res=>{
                    switch (res.data.status){
                        case "SUCCEED":
                            this.text = res.data.text
                            break
                        case "FAILED":
                            this.error = res.data.text
                            break
                    }
                    this.result = true
                    this.loading = false
                })
                .catch(err=>{
                    this.error = err
                    this.result = true
                    this.loading = false
                })
            }
        },
        components: {ButtonBar,Loading,Result}
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