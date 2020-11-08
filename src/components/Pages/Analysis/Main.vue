<template>
    <div id="app">
        <h1>Analysis</h1>
        [menu]<br>
        total: {{menu.total}}<br>
        remembered: {{menu.remembered}}<br>
        rate: {{rate * 100}}%
    </div>
</template>

<script>
import axios from 'axios'
import setting from '../../../conf/setting'

export default {
    data(){
        return {
            menu: {
                total: 0,
                remembered: 0,
            }
        }
    },
    mounted(){
        axios.get(`${setting.server}/menu/count/all`)
        .then(res => this.menu.total = res.data)

        axios.get(`${setting.server}/menu/count/remembered`)
        .then(res => this.menu.remembered = res.data)
    },
    computed: {
        rate(){
            return Math.round(this.menu.remembered/this.menu.total*100)/100
        }
    }
}
</script>

<style scoped>
#app {
    position: fixed;
    top: 30px;
    padding-top: 10px;
    left: 0;
    height: 100vh;
    width: 100%;
    background: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
/*
    z-index: 50;
*/
/*    justify-content: center; */
}

</style>