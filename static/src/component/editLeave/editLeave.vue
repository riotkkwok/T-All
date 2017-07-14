<template lang="jade" src="./editLeave.jade"></template>

<style lang="sass" src="./editLeave.scss"></style>

<script>
import Vue from 'vue'
import * as myUtil from 'myUtil'

let _lastInput;

export default {
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
            return result;
        },
        updateLeaves() {
            if(!this.checkInput(true)){
                return;
            }
            if(!this.leave.time){
                this.isErr = true;
                this.errMsg = '休假时间不能为空;';
                return;
            }
            if(!this.leave.type){
                this.isErr = true;
                this.errMsg = '假期类型不能为空;';
                return;
            }
            new Promise((rs, rj) => {
                this.$store.dispatch('updateLeave', {
                    param: {
                        date: this.leave.date,
                        time: this.leave.time,
                        type: this.leave.type
                    },
                    rs, rj
                })
            }).then(() => {
                this.leave = {
                    date: '',
                    time: '',
                    type: ''
                };
                this.$store.dispatch('queryLeave');
            }, () => {
                this.isErr = true;
                this.errMsg = '休假请求失败;';
                // TODO - 错误处理
            });
        },
        backToTable() {
            this.$store.commit('leaveTaker', null);
            this.$router.replace('/');
        }
    }
};

</script>