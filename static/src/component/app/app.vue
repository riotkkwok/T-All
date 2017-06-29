<template lang="jade">
    div#app
        wHeader

        wLoginPanel

        router-view

        wFooter
</template>

<script>
import wHeader from 'header'
import wFooter from 'footer'
import wLoginPanel from 'loginPanel'

export default {
    name: 'app',
    components: {
        wHeader,
        wFooter,
        wLoginPanel
    },
    mounted() {
        this.$store.dispatch('init');
    }
};
</script>