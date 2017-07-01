<template lang="jade">
div
    wEditLeave
</template>

<script>
import Vue from 'vue'
import wEditLeave from 'editLeave'

export default Vue.extend({
    components: {
        wEditLeave
    },
    mounted() {
        console.debug('p-leaves mounted');
    }
});
</script>