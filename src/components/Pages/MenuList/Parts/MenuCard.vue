<template>
    <div>
        <div class="main" v-if="show">
            <div id="card" @click="editMode=!editMode;if(editMode)slidRight()"
             v-touch:swipe.left="slidLeft"
             v-touch:swipe.right="slidRight"
             :class="{slidLeft: slid, slidRight: !slid}"
            >
                <div :id="_uid"></div>
                <div id="synth"></div>
            </div>
            <div class="delete" @click="remove">
                削除
            </div>
        </div>
        <div class="editor" v-if="show" v-show="editMode">
            <textarea :id="data._id" cols="80" rows="6" v-model="data.abc"></textarea>
            <div class="buttons">
                <button @click="play">
                    <font-awesome-icon icon="play"/>
                </button>
                <button @click="submit">
                    <font-awesome-icon icon="save"/>
                </button>
                <button @click="copy">
                    <font-awesome-icon icon="clipboard"/>
                </button>
            </div>
        </div>
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
            editor: undefined
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
        play(){
            this.editor.synth.synthControl.play()
        },
        copy(){
            document.getElementById(this.data._id).select()
            document.execCommand('Copy')
            window.getSelection().removeAllRanges()
            document.getElementById(this.data._id).blur()
        },
        submit(){
            axios.put(`${setting.server}/menu/${this.data._id}`,{
                abc: this.data.abc
            })
        },
        slidLeft(){
            if(!this.editMode) this.slid = true
        },
        slidRight(){
            this.slid = false
        }
    }
}
</script>

<style scoped>
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
.editor {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
}
button {
    margin: 5px;
}
textarea {
    width: 95%;
    font-size: 16px;
    color:#444444;
}
</style>