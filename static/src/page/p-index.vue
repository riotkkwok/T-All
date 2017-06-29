<template lang="jade">
div
    wTimeTable

    wDetails
</template>

<script>
import Vue from 'vue'
import wTimeTable from 'timeTable'
import wDetails from 'details'

export default Vue.extend({
    components: {
        wTimeTable,
        wDetails
    }
});
</script>