<template>
    <div id="app">
        <h1>Precepts</h1>
        <ul>
            <li v-for="precept in precepts" :key="precept._id">
                {{precept.word}}
                <button @click="remove(precept._id)">x</button>
            </li>
            <input v-model="new_word" placeholder="new word">
            <button @click="save">save</button>
            {{result}}
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import setting from '../../../conf/setting'

export default {
    data(){
        return {
            precepts: [],
            new_word: "",
            result: ""
        }
    },
    methods: {
        load(){
            axios.get(`${setting.server}/precepts`)
            .then(res => this.precepts = res.data)
        },
        remove(_id){
            axios.delete(`${setting.server}/precepts/${_id}`)
            .then(res => this.load())
        },
        save(){
            const data = {word: this.new_word}
            axios.post(`${setting.server}/precepts`,data)
            .then(res => this.load())
        }
    },
    mounted(){
        this.load()
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
}
</style>