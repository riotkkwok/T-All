<template lang="jade" src="./currentLeave.jade"></template>

<style lang="sass" src="./currentLeave.scss"></style>

<script>
import Vue from 'vue'
import * as myUtil from 'myUtil'

export default {
    mounted() {
        this.queryLeaveList();
    },
    data() {
        return {
            leaveList: [],
            msg: ''
        }
    },
    watch: {
        '$store.getters.leaveList': function(){
            this.leaveList = this.$store.getters['leaveList'];
        }
    },
    methods: {
        queryLeaveList() {
            if(!this.$store.getters['leaveTaker']){
                this.msg = '查询失败，请稍后再试';
                return;
            }
            new Promise((rs, rj) => {
                this.$store.dispatch('queryLeave', {rs, rj});
            }).then(() => {
                if(this.$store.getters['leaveList'].length > 0){
                    this.msg = '';
                    this.leaveList = this.$store.getters['leaveList'];
                }else{
                    this.msg = '没有休假记录';
                }
            }, () => {
                this.msg = '查询失败，请稍后再试';
            });
        },
        cancelLeave(date) {
            new Promise((rs, rj) => {
                this.$store.dispatch('deleteLeave', {
                    param: {
                        date
                    },
                    rs, rj});
            }).then(() => {
                this.queryLeaveList();
            }, () => {
                // TODO
                ;
            });
        }
    }
}
</script>