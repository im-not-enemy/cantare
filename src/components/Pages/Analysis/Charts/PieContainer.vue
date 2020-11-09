<template>
    <div>
        <Pie v-if="loaded" :chartdata="chartdata"></Pie>
    </div>
</template>

<script>
import Pie from './Pie.vue'
import axios from 'axios'
import setting from '../../../../conf/setting'

export default {
    components: {Pie},
    data(){
        return {
            loaded: false,
            chartdata: null
        }
    },
    async mounted(){
        this.loaded = false
        let total, remembered

        await axios.get(`${setting.server}/menu/count/all`).then(res=>total = res.data)
        await axios.get(`${setting.server}/menu/count/remembered`).then(res=>remembered=res.data)
        const inprogress = total - remembered

        this.chartdata = {
            labels: ['remembered','inprogress'],
            datasets: [{
                data: [remembered, inprogress],
                backgroundColor: [
                    'rgba(51,153,51,1)'/*#339933*/,'rgba(192,192,192,1)'/*#C0C0C0*/
                ]
            }]
        }
        this.loaded = true
    }
}
</script>

<style scoped>
</style>