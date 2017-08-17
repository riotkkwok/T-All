<template lang="jade">
div
    wEditAssignee
</template>

<script>
import Vue from 'vue'
import wEditAssignee from 'editAssignee'

export default Vue.extend({
    components: {
        wEditAssignee
    },
    mounted() {
        console.debug('p-assignee mounted');
    }
});
</script>