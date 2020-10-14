<template>
    <div id="app">
        <div id="content">
	        <div id="canvas"></div>
            <div id="synth"></div>
            <textarea id="abc" cols="80" rows="6"></textarea>
        </div>
        <div id="commandBar">
            <Submit></Submit>
            <button class="play" @click="play">play</button>
        </div>
    </div>
</template>

<script>
import abcjs from 'abcjs'
import axios from 'axios'
import setting from '../../../conf/setting'
import Submit from './Buttons/Submit'

export default {
    data(){
        return {
            editer: undefined
        }
    },
    methods:{
        play(){
            this.editer.synth.synthControl.play()
        }
    },
    mounted(){
        document.getElementById('abc').value = `T: Demo\nM: 4/4\nL: 1/4\nQ: "Allegro"\nK: C\nC E G z | G E C z | C C E E | G E C z ||`
		this.editer = new abcjs.Editor("abc", {
			canvas_id: "canvas",
			abcjsParams: {
                staffwidth: content.clientWidth //contentの幅いっぱいに表示
            },
            synth: { 
                el: "#synth"
            }
        });
    },
    components: {Submit}
}
</script>

<style scoped>
textarea {
    width: 95%;
}
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
    align-items: center;
    justify-content: center;
}
#commandBar {
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 51;
    background: yellow;
    opacity: 0.5;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.submit {
    margin: 20px 10px
}
.play {
    margin: 20px 10px
}
</style>