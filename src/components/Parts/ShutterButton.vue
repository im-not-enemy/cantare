<template>
    <div>
        <button v-on:click="release">release</button>
    </div>
</template>

<script>
export default {
    methods: {
        release: function(){
            console.log("released.")
        }
    }
}
</script>

<style scoped>

</style>