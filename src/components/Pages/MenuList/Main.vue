<template>
    <div id="app">
        <div id="content" v-if="!(err)">
            <div v-for="item in items" :key="item._id">
                <MenuCard :data="item" :width="width"></MenuCard>
            </div>
        </div>
        <div class="err" v-if="err">{{err}}</div>
    </div>
</template>

<script>
import setting from '../../../conf/setting'
import axios from 'axios'
import MenuCard from './Parts/MenuCard'

export default {
    data(){
        return {
            items: undefined,
            width: 100,
            err: undefined
        }
    },
    mounted(){
        axios.get(`${setting.server}/menu`)
        .then(res=>{
            this.items = res.data
        })
        .catch(err=>{
            this.err = err
        })
        this.width = document.getElementById('app').clientWidth
    },
    components: {MenuCard}
}
</script>

<style scoped>
#content {
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    z-index: 50;
    background: gray;
    display: flex;
    flex-direction: column;
}
.err {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 50;
    background: lightcoral;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>