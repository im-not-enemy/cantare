<template>
    <div>
        <button v-on:click="$emit('click')">submit</button>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
button {
    pointer-events: auto;
}
</style>