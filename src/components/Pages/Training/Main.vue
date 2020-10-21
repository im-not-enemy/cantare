<template>
    <div id="app">
        <div id="content" v-if="!(err)">
            <div id="paper"></div>
            <div id="midi"></div>
            <select v-model="instrument">
                <option value="1" default>Piano</option>
                <option value="10" default>Glocken</option>
                <option value="20" default>Organ</option>
                <option value="25">Guiter</option>
                <option value="41">Violin</option>
                <option value="53">Voice</option>
            </select>
            <button @click="playAll()">play</button>
            <button @click="request">request</button>
            <div>{{clicked}}</div>
        </div>
        <div v-if="err">
            {{err}}
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import setting from '../../../conf/setting'
import moment from 'moment'
import abcjs from 'abcjs'
import pitchToAbc from '../../../common/pitchToAbc'

export default {
    data(){
        return {
            abc: undefined,
            _id: undefined,
            err: undefined,
            visualObj: undefined,
            instrument: 1,
            clicked: []
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
        clickListener(abcelem,tuneNumber,classes,analysis,drag){
            const clickedElement = document.getElementById("paper").querySelector(".abcjs-note_selected")
            const abcPitch = pitchToAbc(abcelem.pitches[0])
            const abcString = `M: 4/4\nL: 1/4\nQ: "Allegro"\nK: C\n${abcPitch}4`
            this.clicked.push(abcPitch)
            const visualObj = abcjs.renderAbc("*",abcString) //sound only
            this.playSound(visualObj[0],this.instrument)
        },
        playSound(visualObj,instrumentNumber){
            const ctx = new AudioContext()
            const cursorControl = {}
            const visualOptions = {}
            const synthControl = new abcjs.synth.SynthController()
            synthControl.load('#midi',cursorControl,visualOptions)
            const audioParams = {
                program: instrumentNumber //number
            }
            synthControl.setTune(visualObj,false,audioParams)
            synthControl.play()
        },
        async playBeat(){
            let meter,qpm,key
            this.abc.split('\n').forEach(directive => {
                if (/^M:/.test(directive)) meter = directive
                else if (/^Q:/.test(directive)) qpm = directive
                else if (/^K:/.test(directive)) key = directive
            });

            const length = `L: 1/${this.visualObj[0].getMeterFraction().den}`

            const notesCountPerMeasure = this.visualObj[0].getMeterFraction().num
            let notes = "D"
            for (let i=1;i<notesCountPerMeasure;i++) notes = notes + "D"

            const abcString = `${meter}\n${length}\n${qpm}\n${key}\n${notes}`
            const visualObj = abcjs.renderAbc("*",abcString) //sound only

            this.playSound(visualObj[0],128)
            return visualObj[0].millisecondsPerMeasure()
        },
        async playAll(){
            const millisecondsPerMeasure = await this.playBeat()
            const timeout = millisecondsPerMeasure
            setTimeout(() => {
                this.playSound(this.visualObj[0],this.instrument)
            }, timeout);
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
                staffwidth: document.getElementById('app').clientWidth,
                add_classes: true,
                clickListener: this.clickListener
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