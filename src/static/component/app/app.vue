<template lang="jade">
    div#app
        wHeader

        wLoginPanel

        wTimeTable

        wDetails

        wFooter
</template>

<script>
import wHeader from 'header'
import wFooter from 'footer'
import wLoginPanel from 'loginPanel'
import wTimeTable from 'timeTable'
import wDetails from 'details'

export default {
    name: 'app',
    components: {
        wHeader,
        wDetails,
        wTimeTable,
        wFooter,
        wLoginPanel
    }
};
</script>