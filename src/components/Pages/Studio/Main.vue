<template>
    <div id="app">
        <div id="content">
	        <div id="canvas"></div>
            <div id="synth"></div>
            <textarea id="abc" cols="80" rows="6"></textarea>
        </div>
        <div id="commandBar">
            <button class="play" @click="play" v-if="!playing">
                <font-awesome-icon icon="play"/>
            </button>
            <button class="play" @click="play" v-if="playing">
                <font-awesome-icon icon="pause"/>
            </button>
            <button class="save" @click="save">
                <font-awesome-icon icon="save"/>
            </button>
        </div>
    </div>
</template>

<script>
import abcjs from 'abcjs'
import axios from 'axios'
import setting from '../../../conf/setting'

export default {
    data(){
        return {
            editor: undefined,
            playing: false
        }
    },
    methods:{
        onEnded(){
            this.playing = false
        },
        play(){
            this.editor.synth.synthControl.play()
            this.editor.synth.synthControl.midiBuffer.onEnded = this.onEnded
            this.playing = true
        },
        save(){
            axios.post(`${setting.server}/menu?`,{abc: abc.value})
            .then(res => {
                this.$emit('popup','saved!')
            })
        }
    },
    mounted(){
        document.getElementById('abc').value = `T: Demo\nM: 4/4\nL: 1/4\nQ: "Allegro"\nK: C\nC E G z | G E C z | C C E E | G E C z ||`
		this.editor = new abcjs.Editor("abc", {
			canvas_id: "canvas",
			abcjsParams: {
                staffwidth: content.clientWidth, //contentの幅いっぱいに表示
                responsive: "resize"
            },
            synth: { 
                el: "#synth"
            }
        });
    }
}
</script>

<style scoped>
textarea {
    width: 95%;
    font-size: 16px;
    color:#444444;
}
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
/*    justify-content: center; */
}
#commandBar {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 51;
    background: white;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.5);
    display: flex;
    flex-direction: row;
    justify-content: center;
}
button {
    margin: 20px 10px;
    font-size: 16px;
}
</style>