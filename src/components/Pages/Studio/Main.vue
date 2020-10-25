<template>
    <div id="app">
        <div id="content">
	        <div id="canvas"></div>
            <div id="synth"></div>
            <textarea id="abc" cols="80" rows="6"></textarea>
        </div>
        <div id="commandBar">
            <button class="play" @click="play">
                <font-awesome-icon icon="play"/>
            </button>
            <Submit></Submit>
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
                staffwidth: content.clientWidth, //contentの幅いっぱいに表示
                responsive: "resize"
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
    font-size: 16px;
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
.play {
    margin: 20px 10px;
    font-size: 16px;
}
</style>