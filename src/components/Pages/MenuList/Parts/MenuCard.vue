<template>
    <div id="card" v-if="show">
        <div v-show="state === 'front'">
            <div :id="_uid"></div>
            <div :class="data._id"></div>
        </div>
        <div v-show="state === 'back'">
            <p>{{data.abc}}</p>
        </div>

        <!-- 固定表示 -->
        <div class="buttons">
            <button class="delete" @click="remove">X</button>
            <button class="turn" @click="turn">@</button>
        </div>
        <!-------------->
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
        },
        turn(){
            this.state = this.state === "front" ? "back" : "front"
        }
    }
}
</script>

<style scoped>
#card {
    position: relative;
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
p {
    white-space: pre-wrap;
}
</style>