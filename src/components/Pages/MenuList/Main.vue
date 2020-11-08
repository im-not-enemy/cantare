<template>
    <div id="app">
        <div id="content" v-if="!(err)">
            <div v-for="item in items" :key="item._id">
                <MenuCard :data="item" :width="width" @popup="(msg)=>$emit('popup',msg)"></MenuCard>
            </div>
        </div>
        <div class="err" v-if="err">{{err}}</div>
        <div class="footer">
            <div class="pagination">
                <button v-for="p in pages" :key="p" @click="page = p">{{p}}</button>
            </div>
        </div>
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
            err: undefined,
            page: 1,
            pages: [],
            menusPerPage: setting.menulist.menusPerPage,
            totalCount: 0
        }
    },
    methods: {
        fetchMenu(page){
            axios.get(`${setting.server}/menu?page=${page}`).then(res=>{this.items = res.data})
        }
    },
    watch: {
        page: function(){this.fetchMenu(this.page)}
    },
    mounted(){
        this.width = document.getElementById('app').clientWidth
        this.fetchMenu(this.page)

        axios.get(`${setting.server}/menu/totalCount`).then(res=>{
            this.totalCount = parseInt(res.data)
            const maxPageCount = Math.ceil(this.totalCount / this.menusPerPage)
            for (let i=1;i<=maxPageCount;i++) this.pages.push(i)
        })
    },
    components: {MenuCard}
}
</script>

<style scoped>
#content {
    position: absolute;
    top: 30px;
    padding-top: 6px;
    margin-bottom: 30px;
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
.footer {
    background: white;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    bottom: 0;
    height: 30px;
    width: 100%;
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>