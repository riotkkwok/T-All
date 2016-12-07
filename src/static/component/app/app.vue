<template lang="jade">
    div#app
        wHeader
        wFooter
</template>

<script>
import wHeader from 'header'
import wFooter from 'footer'

export default {
    name: 'app',
    components: {
        wHeader,
        // 'wEditor': require('../editor/editor.js'),
        // 'wTimeTable': require('../timeTable/timeTable.js'),
        wFooter,
        // 'wLoginPanel': require('loginPanel')
    }
};
</script>