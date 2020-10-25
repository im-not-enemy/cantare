<template>
    <div class="content" v-if="show">
        <div id="card" @click="turn"
         v-touch:swipe.left="slidLeft"
         v-touch:swipe.right="slidRight"
         :class="{slidLeft: slid, slidRight: !slid}"
        >
            <div v-show="state === 'front'">
                <div :id="_uid"></div>
                <div :class="data._id"></div>
            </div>
            <div v-show="state === 'back'">
                <p>{{data.abc}}</p>
            </div>
        </div>
        <div class="delete" @click="remove">
            削除
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
            state: "front" // or "back"
        }
    },
    mounted(){
        abcjs.renderAbc(String(this._uid),this.data.abc,{
            paddingleft: 0,
            paddingright: 0,
            paddingtop: 0,
            paddingbottom: 0,
            staffwidth: this.width - 5,
            responsive: "resize"
        })
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
            console.log("------------")
        },
        turn(){
            this.state = this.state === "front" ? "back" : "front"
        },
        slidLeft(){
            this.slid = true
        },
        slidRight(){
            this.slid = false
        }
    }
}
</script>

<style scoped>
.content {
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
.buttons {
    position: absolute;
    top: 0;
    right: 0;
    background: white;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.5);
    padding: 5px;
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
</style>