<template>
    <div v-if="show" class="content">
        <div class="main">
            <div id="card"
             v-touch:swipe.left="slidLeft"
             v-touch:swipe.right="slidRight"
             :class="{slidLeft: slid, slidRight: !slid}"
            >
                <div class="buttons">
                    <button class="editButton" @click="editMode=!editMode">
                        <font-awesome-icon icon="edit"/>
                    </button>
                    <button @click="switchRemembered" :class="{remembered: data.remembered}">
                        <font-awesome-icon icon="check-square"/>
                    </button>
                    <button @click="switchBookmarked" :class="{bookmarked: data.bookmarked}">
                        <font-awesome-icon icon="bookmark"/>
                    </button>
                </div>
                <div :id="_uid"></div>
                <div id="synth"></div>
            </div>
            <div class="delete" @click="remove">
                削除
            </div>
        </div>
        <transition>
        <div class="editor" v-show="editMode">
            <textarea :id="data._id" cols="80" rows="6" v-model="data.abc"></textarea>
            <div class="buttons">
                <button @click="play" v-if="!playing">
                    <font-awesome-icon icon="play"/>
                </button>
                <button @click="play" v-if="playing">
                    <font-awesome-icon icon="pause"/>
                </button>
                <button @click="submit">
                    <font-awesome-icon icon="save"/>
                </button>
                <button @click="copy">
                    <font-awesome-icon icon="clipboard"/>
                </button>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
import abcjs from 'abcjs'
import axios from 'axios'
import setting from '../../../../conf/setting'

export default {
    props: ["data","width"],
    data(){
        return {
            show: true,
            slid: false,
            editMode: false,
            editor: undefined,
            playing: false
        }
    },
    mounted(){
		this.editor = new abcjs.Editor(this.data._id, {
			canvas_id: this._uid,
			abcjsParams: {
                staffwidth: content.clientWidth, //contentの幅いっぱいに表示
                responsive: "resize"
            },
            synth: { 
                el: "#synth"
            }
        });
    },
    methods: {
        switchRemembered(){
            this.data.remembered = !this.data.remembered
            axios.put(`${setting.server}/menu/${this.data._id}/remembered`,{
                remembered: this.data.remembered
            })
            .then(res=>{
                let message
                if (this.data.remembered) message = "remembered!"
                else message = "forgot!"
                this.$emit('popup', message)
            })
        },
        switchBookmarked(){
            this.data.bookmarked = !this.data.bookmarked
            axios.put(`${setting.server}/menu/${this.data._id}/bookmarked`,{
                bookmarked: this.data.bookmarked
            })
            .then(res=>{
                let message
                if (this.data.bookmarked) message = "bookmarked!"
                else message = "unbookmarked!"
                this.$emit('popup', message)
            })
        },
        remove(){
            axios.delete(`${setting.server}/menu/${this.data._id}`)
            .then(res => {
                if (res.status === 200){
                    this.show = false
                }
                else {
                    console.log(res)
                }
            })
        },
        onEnded(){
            this.playing = false
        },
        play(){
            this.editor.synth.synthControl.play()
            this.editor.synth.synthControl.midiBuffer.onEnded = this.onEnded
            this.playing = true
        },
        copy(){
            document.getElementById(this.data._id).select()
            document.execCommand('Copy')
            window.getSelection().removeAllRanges()
            document.getElementById(this.data._id).blur()
            const message = "copied!"
            this.$emit('popup',message)
        },
        submit(){
            axios.put(`${setting.server}/menu/${this.data._id}/abc`,{
                abc: this.data.abc
            })
            .then(res=>{
                const message = "saved!"
                this.$emit('popup',message)
            })
        },
        slidLeft(){
            if(!this.editMode) this.slid = true
        },
        slidRight(){
            this.slid = false
        },
    },
}
</script>

<style scoped>
.content {
    position: relative;
}
.main {
    position: relative;
}
#card {
    position: relative;
    z-index: 2;
    margin-top: 1px;
    margin-bottom: 1px;
    width: 100%;
    background: whitesmoke;
}
.editor {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 170px;
}
.delete {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    height: 100%;
    width: 75px;
    background: red;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}
p {
    white-space: pre-wrap;
}
.slidLeft {
    transform: translateX(-75px);
    transition-duration: 0.5s;
}
.slidRight {
    transition-duration: 0.5s;
}
.editor > .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
button {
    margin: 5px;
}
textarea {
    width: 95%;
    font-size: 16px;
    color:#444444;
}
.v-enter, .v-leave-to {
    height: 0;
}
.v-enter-active, .v-leave-active {
    transition-property: all;
    transition-duration: 0.5s;
}
.remembered {
    color: #339933; 
}
.bookmarked {
    color: #339933; 
}
.main .buttons {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 100;
}
</style>