<template lang="jade" src="./details.jade"></template>

<style lang="sass" src="./details.scss"></style>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'

import * as myUtil from 'myUtil'

export default {
    data() {
        return {};
    },
    computed: {
        showDetails() {
            return this.$store.commit('showDetails');
        }
    },
    methods: 
}
</script>