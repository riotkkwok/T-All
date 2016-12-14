<template lang="jade">
    div#app
        wHeader

        wLoginPanel

        wTimeTable

        wFooter
</template>

<script>
import wHeader from 'header'
import wFooter from 'footer'
import wLoginPanel from 'loginPanel'
import wTimeTable from 'timeTable'

export default {
    name: 'app',
    components: {
        wHeader,
        // 'wEditor': require('../editor/editor.js'),
        wTimeTable,
        wFooter,
        wLoginPanel
    }
};
</script>