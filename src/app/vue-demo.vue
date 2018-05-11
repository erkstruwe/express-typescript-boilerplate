<template lang="pug">
    .example {{ msg }}
</template>

<script>
    export default {
        data () {
            return {
                msg: 'Hello world!'
            }
        }
    }
</script>

<style lang="scss">
    .example {
        color: red;
    }
</style>