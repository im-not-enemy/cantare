<template>
    <div>
        <button v-on:click="submit">submit</button>
    </div>
</template>

<script>
export default {
    methods: {
        submit: function(){
            console.log("submit")
        }
    }
}
</script>

<style scoped>

</style>