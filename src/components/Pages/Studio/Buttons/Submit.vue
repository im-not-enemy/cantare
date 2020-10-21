<template>
    <div class="submitButton">
        <button @click="submit">
            {{label}}
        </button>
        <div class="popup" v-if="popup">
            <span @click="popup=false">{{result}}</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import setting from '../../../../conf/setting'
import moment from 'moment'

export default {
    data(){
        return {
            label: "submit",
            result: "",
            popup: false
        }
    },
    methods: {
        submit(){
            this.popup = false
            // 変数 abc は Main.vue の document.getElementById('abc') の値に依存しています
            const now = moment().format()
            const abcString = abc.value
            this.label = "loading"
            axios.post(`${setting.server}/menu?`,{
                abc: abcString,
                created: now
            })
            .then(res=>{
                this.label = "submit"
                if (res.status === 200){
                    this.popup = true
                    this.result = "SUCCEED"
                }
                else {
                    this.popup = true
                    this.result = "FALSE"
                }
            })
        }
    }
}
</script>

<style scoped>
.submitButton {
    position: relative;
    display: flex;
    align-items: center;
}
.popup {
    position: absolute;
    top: -40px;
    border: solid tomato;
    text-align: center;
    display: flex;
    flex-direction: row;
}
</style>