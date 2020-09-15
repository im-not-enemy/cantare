<template>
    <div id="app">
        <h2>Menu</h2>
        <div v-for="item in items" :key="item._id">
            <MenuCard :data="item"></MenuCard>
        </div>
    </div>
</template>

<script>
import setting from '../../conf/setting'
import axios from 'axios'
import MenuCard from '../Parts/MenuCard'

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
    },
    components: {MenuCard}
}
</script>

<style scoped>

</style>