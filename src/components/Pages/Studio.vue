<template>
    <div id="app">
        <div id="content">
	        <div id="canvas"></div>
            <div id="synth"></div>
            <textarea id="abc" cols="80" rows="5">
T: Demo
M: 4/4
L: 1/4
K: C
C E G z | G E C z | C C E E | G E C z ||</textarea>
        </div>
        <ButtonBar :mode="['play','submit']" @submit="submit" @play="play"></ButtonBar>
    </div>
</template>

<script>
import abcjs from 'abcjs'
import axios from 'axios'
import setting from '../../conf/setting'
import ButtonBar from '../Parts/MultiButtonBar'

export default {
    data(){
        return {
            editer: undefined
        }
    },
    methods:{
        submit(){
            const abc = document.getElementById('abc').value
            axios.post(`${setting.server}/menu?`,{abc:abc})
        },
        play(){
            this.editer.synth.synthControl.play()
        }
    },
    mounted(){
		this.editer = new abcjs.Editor("abc", {
			canvas_id: "canvas",
			abcjsParams: {
                staffwidth: document.getElementById('content').clientWidth //contentの幅いっぱいに表示
            },
            synth: { 
                el: "#synth"
            }
        });
    },
    components: {ButtonBar}
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
</style>