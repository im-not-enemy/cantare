<template>
    <div id="app">
        <div class="header">
            <button @click="show=!show">
                <font-awesome-icon icon="bars"/>
            </button>
        </div>
        <transition>
            <div class="side-bar" v-show="show" v-touch:swipe.left="hide">
                <div><router-link to="/studio">Studio</router-link></div>
                <div><router-link to="/menulist">Menulist</router-link></div>
                <div>Training</div>
                <ul>
                    <li><router-link to="/training/random/all">All</router-link></li>
                    <li><router-link to="/training/random/inprogress">Inprogress Only</router-link></li>
                    <li><router-link to="/training/random/bookmarked">Bookmarked Only</router-link></li>
                </ul>
                <div><router-link to="/analysis">Analysis</router-link></div>
                <div><router-link to="/precepts">Precepts</router-link></div>
                <button @click="enable" v-if="!(full)">
                    <font-awesome-icon icon="expand"/>
                </button>
                <button @click="disable" v-if="full">
                    <font-awesome-icon icon="compress"/>
                </button>
            </div>
        </transition>
        <router-view v-on:popup="showPopup"></router-view>
        <transition name="fade">
            <div class="welcome" v-if="!firstSoundPlayed">
                <div class="meigen">
                    {{meigen.message}}
                </div>
                <div class="buttons">
                    <button @click="like">
                        <font-awesome-icon icon="thumbs-up"/>
                    </button>
                    <button @click="dislike">
                        <font-awesome-icon icon="thumbs-down"/>
                    </button>
                </div>
            </div>
        </transition>
        <transition name="slide">
            <div v-if="popup.show" class="popup" @click="popup.show = false">
                <div>{{popup.message}}</div>
            </div>
        </transition>
    </div>
</template>

<script>
import setting from '../conf/setting'
import axios from 'axios'

export default {
    data: function(){
        return {
            show: false,
            full: false,
            firstSoundPlayed: false,
            audioSource: undefined,
            meigen: {
                _id: undefined,
                message: undefined
            },
            popup: {
                show: false,
                message: undefined
            }
        }
    },
    methods: {
        hide: function(){
            this.show= false
        },
        enable(){
            document.getElementById('app').requestFullscreen()
            this.full = true
        },
        disable(){
            document.exitFullscreen()
            this.full = false
        },
        like(){
            axios.post(`${setting.meigen}/meigen/${this.meigen._id}?like=like`)
            this.enter()
        },
        dislike(){
            axios.post(`${setting.meigen}/meigen/${this.meigen._id}?like=false`)
            axios.get(`${setting.meigen}/meigen`)
            .then(res => this.meigen = res.data[0])
        },
        enter(){
            this.firstSoundPlayed = true
            this.audioSource.start(0)
        },
        showPopup(message){
            this.popup.show = true
            this.popup.message = message
            setTimeout(() => {
                this.popup.show = false
            }, 3000);
        }
    },
    async mounted(){
        window.abcjsAudioContext = new (AudioContext||webkitAudioContext)()
        const response = await fetch("./mp3/people-performance-cheer1.mp3")
        const arrayBuffer = await response.arrayBuffer()
        window.abcjsAudioContext.decodeAudioData(
            arrayBuffer,
            (audioBuffer)=>{
                this.audioSource = window.abcjsAudioContext.createBufferSource()
                this.audioSource.buffer = audioBuffer
                /* volume調整 */
                const gainNode = window.abcjsAudioContext.createGain()
                this.audioSource.connect(gainNode)
                gainNode.connect(window.abcjsAudioContext.destination)
                gainNode.gain.value = -0.5
                /* ---------- */
                this.audioSource.connect(window.abcjsAudioContext.destination)
            }
        )
        axios.get(`${setting.meigen}/meigen`)
        .then(res => this.meigen = res.data[0])
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: 1.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
.v-enter-active, .v-leave-active {
    transition-duration: 0.3s;
}
.v-enter, .v-leave-to {
    transform: translateX(-200px);
    opacity: 0;
}
.slide-enter-active, .slide-leave-active {
    transition-duration: 0.5s;
}
.slide-enter, .slide-leave-to {
    transform: translateY(-90px);
    opacity: 0;
}
a {
    color: #444444;
    text-decoration: none;
}
* {
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}
.side-bar {
    background: white;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    padding: 45px 5px 5px 5px;
    height: 100vh;
    width: 200px;
    z-index: 100;
}
.side-bar > * {
    margin: 10px;
    font-size: 16px;
}
router-view {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 0;
}
.header {
    background: white;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    margin: 0px;
    padding: 3px;
    z-index: 150;
    display: flex;
}
.header > button {
    font-size: 16px;
}
.welcome {
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 100vh;
    background: #555555;
    opacity: 0.1;
    z-index: 200;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.meigen {
    color: white;
    width: 80%;
}
.meigen > .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
}
.buttons > button {
    margin: 10px 5px;
    font-size: 16px;
}
.popup {
    position: absolute;
    top: 0;
    left: 0;
    height: 90px;
    width: 100%;
    z-index: 300;
    display: flex;
    justify-content: center;
    align-items: center;
}
.popup > div {
    background: black;
    color: white;
    opacity: 0.6;
    height: 100%;
    width: 99%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
ul {
    padding-left: 25px;
    font-size: 14px;
}
div {
    color: #444444;
}
</style>