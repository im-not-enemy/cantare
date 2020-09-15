<template>
    <div id="app">
        <div id="content">
	        <div id="canvas"></div>
	        <textarea id="abc" cols="80" rows="5" v-model="this.text"></textarea>
            <div id="synth"></div>
        </div>
        <ButtonBar mode="submit" @click="submit"></ButtonBar>
    </div>
</template>

<script>
import abcjs from 'abcjs'
import axios from 'axios'
import setting from '../../conf/setting'
import ButtonBar from '../Parts/ButtonBar'

export default {
    data(){
        return {
            text: 'T: Demo\nM: 4/4\nL: 1/4\nK: C\nC E G z | G E C z | C C E E | G E C z ||'
        }
    },
    methods:{
        submit(){
		    axios.post(`${setting.server}/menu?`,{abc:this.text})
        }
    },
    mounted(){
		new abcjs.Editor("abc", {
			canvas_id: "canvas",
			abcjsParams: {
                staffwidth: document.getElementById('content').clientWidth //contentの幅いっぱいに表示
            },
            synth: {
                el: "#synth",
                options: {
                    displayPlay: true
                }
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