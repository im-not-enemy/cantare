<template>
    <div id="card">
        <div id="paper"></div>
        <div :class="data._id"></div>
        <button class="delete" @click="remove">X</button>
    </div>
</template>

<script>
import abcjs from 'abcjs'
import axios from 'axios'
import setting from '../../conf/setting'

export default {
    props: ["data","width"],
    mounted(){
        // そのまま #paperにレンダリングしてしまうと、上書きループするので
        // 一度 #paperにレンダリングされたSVGだけ取り出して個別に再レンダリング
        abcjs.renderAbc("paper",this.data.abc,{
            paddingleft: 0,
            paddingright: 0,
            paddingtop: 0,
            paddingbottom: 0,
            staffwidth: this.width - 5
        })
        const paper = document.getElementById('paper')
        const svg = paper.getElementsByTagName('svg') //svg情報のみ取得
        const data = document.getElementsByClassName(this.data._id)[0]
        data.appendChild(svg[0]) //再レンダリング
        paper.remove() //#paperは削除
    },
    methods: {
        remove(){
            axios.delete(`${setting.server}/menu/${this.data._id}`)
        }
    }
}
</script>

<style scoped>
#card {
    position: relative;
    border: solid 1px gray;
    margin-top: 1px;
    margin-bottom: 1px;
    width: 100%;
    background: lightcyan;
}
.delete {
    position: absolute;
    top: 0;
    right: 0;
}
</style>