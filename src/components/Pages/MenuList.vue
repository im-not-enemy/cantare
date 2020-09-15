<template>
    <div id="app">
        <h2>Menu</h2>
        <div v-for="item in items" :key="item._id">
            {{item}}
        </div>
    </div>
</template>

<script>
import setting from '../../conf/setting'
import axios from 'axios'

export default {
    data(){
        return {
            items: undefined
        }
    },
    mounted(){
        axios.get(`${setting.server}/menu`)
        .then(res=>{
            this.items = res.data
        })
    }
}
</script>

<style scoped>

</style>