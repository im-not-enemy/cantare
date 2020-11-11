<template>
    <div id="app">
        <div id="content" v-if="!(err)">
            <div id="paper"></div>
            <div id="audio"></div>
            <select v-model="instrument">
                <option value="1" default>Piano</option>
                <option value="10" default>Glocken</option>
                <option value="20" default>Organ</option>
                <option value="25">Guiter</option>
                <option value="41">Violin</option>
                <option value="53">Voice</option>
            </select>
            <div class="buttons">
                <button id="playButton" @click="playSong()">
                    <font-awesome-icon icon="play"/>
                </button>
                <button @click="stop()">
                    <font-awesome-icon icon="stop"/>
                </button>
                <button @click="request()">
                    <font-awesome-icon icon="step-forward"/>
                </button>
                <button @click="switchRemembered()" :class="{remembered: remembered}">
                    <font-awesome-icon icon="check-square"/>
                </button>
                <button @click="switchBookmarked()" :class="{bookmarked: bookmarked}">
                    <font-awesome-icon icon="bookmark"/>
                </button>
            </div>
            <div>clicked: {{clicked}}</div>
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
    props: {
        mode: {type: String}
    },
    data(){
        return {
            abc: undefined,
            _id: undefined,
            remembered: undefined,
            bookmarked: undefined,
            err: undefined,
            visualObj: undefined,
            instrument: 1,
            clicked: [],
            synthControl: undefined,
            playing: false,
            uri: undefined
        }
    },
    methods: {
        request(){
            axios.get(this.uri)
            .then(res => {
                if (res.data[0] === undefined){
                    const message = "No content!"
                    this.$emit('popup', message)
                }
                else {
                    this.abc = res.data[0].abc
                    this._id = res.data[0]._id
                    this.remembered = res.data[0].remembered
                    this.bookmarked = res.data[0].bookmarked
                }
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
            this.playNote(visualObj)
        },
        stop(){
            this.synthControl.pause()
        },
        playNote(visualObj){
            const audioParams = {
                program: this.instrument //number
            }
            const synthControl = new abcjs.synth.SynthController()
            synthControl.setTune(visualObj[0],false,audioParams)
            synthControl.play()
        },
        onEnded(){
            this.playing = false
        },
        playSong(){
            const drumBeats = {
                "2/4": "dd 76 77 60 30",
                "3/4": "ddd 76 77 77 60 30 30",
                "4/4": "dddd 76 77 77 77 60 30 30 30",
                //"5/4": "ddddd 76 77 77 76 77 60 30 30 60 30",
                //"6/8": "dd 76 77 60 30",
                "6/8": "dddddd 76 77 77 76 77 77 60 30 30 60 30 30",
                //"9/8": "ddd 76 77 77 60 30 30",
                //"12/8": "dddd 76 77 77 77 60 30 30 30"
            };
            const meter = this.visualObj[0].getMeterFraction().num + "/" + this.visualObj[0].getMeterFraction().den
            const audioParams = {
                program: this.instrument, //number
                drum: drumBeats[meter],
                drumBars: 1,
                drumIntro: 2
            }
            const synthControl = new abcjs.synth.SynthController()
            synthControl.setTune(this.visualObj[0],false,audioParams)
            synthControl.play()
            synthControl.midiBuffer.onEnded = this.onEnded
            this.synthControl = synthControl
            this.playing = true
        },
        switchRemembered(){
            this.remembered = !this.remembered
            axios.put(`${setting.server}/menu/${this._id}/remembered`,{
                remembered: this.remembered
            })
            .then(res=>{
                let message
                if (this.remembered) message = "remembered!"
                else message = "forgot!"
                this.$emit('popup', message)
            })
        },
        switchBookmarked(){
            this.bookmarked = !this.bookmarked
            axios.put(`${setting.server}/menu/${this._id}/bookmarked`,{
                bookmarked: this.bookmarked
            })
            .then(res=>{
                let message
                if (this.bookmarked) message = "bookmarked!"
                else message = "unbookmarked!"
                this.$emit('popup', message)
            })
        },
        setUri(){
            if (this.mode === "random-all") this.uri = `${setting.server}/question/random/all`
            else if (this.mode === "random-inprogress") this.uri = `${setting.server}/question/random/inprogress`
            else if (this.mode === "random-bookmarked") this.uri = `${setting.server}/question/random/bookmarked`
            else this.uri = `${setting.server}/question/random/all`
        }
    },
    mounted(){
        this.setUri()
        this.request()
    },
    watch: {
        mode(){
            this.setUri()
            this.request()
        },
        abc(){
            this.visualObj = abcjs.renderAbc("paper",this.abc,{
                paddingleft: 0,
                paddingright: 0,
                paddingtop: 0,
                paddingbottom: 0,
                staffwidth: document.getElementById('app').clientWidth,
                add_classes: true,
                clickListener: this.clickListener,
                responsive: "resize"
            })
        },
        playing(){
            document.getElementById('playButton').disabled = this.playing
        }
    }
}
</script>

<style scoped>
#content {
    position: fixed;
    top: 30px;
    padding-top: 10px;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 50;
    background: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#content * {
    font-size: 16px;
}
.buttons {
    display: flex;
    justify-content: center;
}
button {
    margin: 5px;
}
select {
    width: 120px;
    margin: 10px;
}
.remembered {
    color: #339933; 
}
.bookmarked {
    color: #339933; 
}
</style>