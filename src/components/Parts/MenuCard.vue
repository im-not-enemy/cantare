<template>
    <div id="card">
        <div id="paper"></div>
        <div :class="data._id"></div>
        {{data}}
    </div>
</template>

<script>
import abcjs from 'abcjs'

export default {
    props: ["data"],
    mounted(){
        // そのまま #paperにレンダリングしてしまうと、上書きループするので
        // 一度 #paperにレンダリングされたSVGだけ取り出して個別に再レンダリング
        console.log(document.getElementById('card').clientWidth)
        abcjs.renderAbc("paper",this.data.abc)
        const paper = document.getElementById('paper')
        const svg = paper.getElementsByTagName('svg') //svg情報のみ取得
        const data = document.getElementsByClassName(this.data._id)[0]
        data.appendChild(svg[0]) //再レンダリング
        paper.remove() //#paperは削除
    }
}
</script>

<style scoped>
#card {
    border: solid 1px gray;
    margin: 1px;
    width: 100%;
    background: lightcyan;
}
</style>