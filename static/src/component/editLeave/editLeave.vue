<template lang="jade" src="./editLeave.jade"></template>

<style lang="sass" src="./editLeave.scss"></style>

<script>
import Vue from 'vue'
import * as myUtil from 'myUtil'

let _lastInput;

export default {
    beforeCreate() {
        if(!this.$store.getters['leaveTaker']){
            this.$router.replace('/');
        }
    },
    data() {
        return {
            ppl: this.$store.getters['leaveTaker'] || {name: '', id: ''},
            leave: {
                date: '',
                time: '',
                type: ''
            },
            isErr: false,
            errMsg: ''
        }
    },
    methods: {
        checkInput(immediate) {
            let result;
            _lastInput = Date.now();
            result = this.leave.date.match(/^(20[0-9]{2})((?:0[1-9])|10|11|12)([0-3][0-9])$/);
            if(!result || result.length <= 1){
                result = false;
            }else{
                result.shift();
                if(result.join('/') === myUtil.dateString(new Date(result.join('/')))){
                    result = true;
                }else{
                    result = false;
                }
            }
            if(!result){
                if(immediate){
                    this.isErr = true;
                    this.errMsg = '休假日期不正确;';
                }else{
                    setTimeout(() => {
                        if(Date.now() - _lastInput >= 1000){
                            this.isErr = true;
                            this.errMsg = '休假日期不正确;';
                        }
                    }, 1000);
                }
            }else{
                this.isErr = false;
                this.errMsg = '';
            }
        },
        updateLeaves() {},
        backToTable() {
            this.$store.commit('leaveTaker', null);
            this.$router.replace('/');
        }
    }
};

</script>