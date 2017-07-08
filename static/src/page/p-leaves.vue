<template lang="jade">
div
    wEditLeave

    wCurrentLeave
</template>

<script>
import Vue from 'vue'
import wEditLeave from 'editLeave'
import wCurrentLeave from 'currentLeave'

export default Vue.extend({
    components: {
        wEditLeave,
        wCurrentLeave
    },
    mounted() {
        console.debug('p-leaves mounted');
        if(!this.$store.getters['isLogined'] || !this.$store.getters['isAdmin'] || !this.$store.getters['leaveTaker']){
            this.$router.replace('/');
        }
    }
});
</script>