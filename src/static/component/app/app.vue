<template lang="jade">
    div.main
</template>

<script>
export default {
    name: 'app',
    components: {
        'wHeader': require('header'),
        'wEditor': require('../editor/editor.js'),
        'wTimeTable': require('../timeTable/timeTable.js'),
        'wFooter': require('footer'),
        'wLoginPanel': require('loginPanel')
    }
};
</script>