<template lang="jade" src="./editLeave.jade"></template>

<style lang="sass" src="./editLeave.scss"></style>

<script>
import Vue from 'vue'

export default {
    beforeCreate() {
        if(!this.$store.getters['leaveTaker']){
            this.$router.push('/');
        }
    },
    data() {
        return {
            ppl: this.$store.getters['leaveTaker'] || {name: '', id: ''},
            leave: {
                date: '',
                time: ''
            },
            isErr: false,
            errMsg: ''
        }
    },
    methods: {
        checkInput() {},
        updateLeaves() {}
    }
};

</script>