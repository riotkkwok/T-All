<template lang="jade" src="./details.jade"></template>

<style lang="sass" src="./details.scss"></style>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'

import * as myUtil from 'myUtil'

function mergeDates(dateStrLs){
    let tmp, isConsec = false, result = '', ls = [].concat(dateStrLs);
    ls.sort();
    for(let i=0; i<ls.length; i++){
        if(!tmp){
            result += myUtil.dateString2(new Date(ls[i]));
        }else{
            tmp = new Date(tmp);
            tmp.setDate(tmp.getDate()+1);
            if(myUtil.dateString(tmp) === myUtil.dateString(new Date(ls[i]))){
                if(!isConsec){
                    result += '-';
                    isConsec = true;
                }
                if(i+1 === ls.length){
                    result += myUtil.dateString2(new Date(ls[i]));
                }
            }else{
                if(!!isConsec){
                    tmp.setDate(tmp.getDate()-1);
                    result += myUtil.dateString2(tmp);
                }
                isConsec = false;
                result += (', ' + myUtil.dateString2(new Date(ls[i])));
            }
        }
        tmp = ls[i];
    }
    return result;
}

export default {
    filters: {
        phaseToString(input) {
            switch(input){
                case 'dev': return '开发: ';break;
                case 'intg': return '联调: ';break;
                case 'test': return '测试: ';break;
                case 'rls': return '上线: ';break;
                default: ' ';
            }
        },
        timeToString(input) {
            let output = '';
            if(typeof input === 'string'){
                return input;
            }
            if(input.length <= 0){
                return '';
            }
            output += mergeDates(input);
            return output;
        }
    },
    data() {
        return {
            showEditBtn: this.$store.getters['isLogined'] && this.$store.getters['isAdmin']
        }
    },
    computed: {
        showDetails() {
            return this.$store.getters['showDetails'];
        },
        task() {
            let task = this.$store.getters['detailedTask'],
                asgList = this.$store.getters['assigneeList'];
            if(!task || !task.asg){
                return {};
            }
            for(let i=0; i<task.asg.length; i++){
                for(let j=0; j<asgList.length; j++){
                    if(task.asg[i].id === asgList[j].id)
                    task.asg[i].name = asgList[j].name;
                }
            }
            return task;
        }
    },
    methods: {
        exitDetails() {
            this.$store.commit('showDetails', false);
            this.$store.commit('detailedTask', null);
        },
        getBack() {
           this.exitDetails(); 
        },
        edit() {
            this.$store.commit('showEditor', this.$store.getters['detailedTask']);
            this.$store.commit('showEditor', true);
            this.exitDetails();
        }
    } 
}
</script>