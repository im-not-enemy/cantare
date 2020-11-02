<template>
    <div v-if="show" class="content">
        <div class="main">
            <div id="card"
             v-touch:swipe.left="slidLeft"
             v-touch:swipe.right="slidRight"
             :class="{slidLeft: slid, slidRight: !slid}"
            >
                <button class="editButton" @click="editMode=!editMode">
                    <font-awesome-icon icon="edit"/>
                </button>
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
        },
        submit(){
            axios.put(`${setting.server}/menu/${this.data._id}/abc`,{
                abc: this.data.abc
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
.buttons {
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
.editButton {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 100;
}
</style>