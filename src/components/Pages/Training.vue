<template>
    <div id="app">
        <div id="content" v-if="!(err)">
            <h2>Trainning</h2>
            <div id="paper"></div>
            <button @click="request">request</button>
            <button @click="play">play</button>
            <button @click="submit('succeed')">succeed</button>
            <button @click="submit('failed')">failed</button>
        </div>
        <div v-if="err">
            {{err}}
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import setting from '../../conf/setting'
import moment from 'moment'
import abcjs from 'abcjs'

export default {
    data(){
        return {
            abc: undefined,
            _id: undefined,
            err: undefined,
            visualObj: undefined
        }
    },
    methods: {
        request(){
            axios.get(`${setting.server}/question/random`)
            .then(res => {
                this.abc = res.data[0].abc
                this._id = res.data[0]._id
            })
            .catch(err => {
                this.err = err
            })
        },
        async play(){
            const ctx = new AudioContext()
            const synth = new abcjs.synth.CreateSynth()
            await synth.init({
                audioContext: ctx,
                visualObj: this.visualObj[0]
            })
            await synth.prime()
            await synth.start()
        },
        submit(result){
            axios.put(`${setting.server}/menu/${this._id}/result`,{
                timestamp: moment(),
                result: result
            })
        }
    },
    mounted(){
        this.request()
    },
    watch: {
        abc(){
            this.visualObj = abcjs.renderAbc("paper",this.abc,{
                paddingleft: 0,
                paddingright: 0,
                paddingtop: 0,
                paddingbottom: 0,
                staffwidth: document.getElementById('app').clientWidth
            })
        }
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
    background: lightyellow;
    display: flex;
    flex-direction: column;
}
</style>