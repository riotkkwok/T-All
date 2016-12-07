<template lang="jade">
    div#app
        wHeader

        wLoginPanel

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
        // 'wEditor': require('../editor/editor.js'),
        // 'wTimeTable': require('../timeTable/timeTable.js'),
        wFooter,
        wLoginPanel
    }
};
</script>