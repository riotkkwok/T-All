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
            showEditBtn: this.$store.getters['isLogined'] && this.$store.getters['isAdmin'],
            showDeleteTaskDialog: false
        }
    },
    computed: {
        mode: {
            set(val) {
                this.$store.commit('mode', val);
            },
            get() {
                return this.$store.getters['mode'];
            }
        },
        showDetails() {
            return this.$store.getters['showDetails'];
        },
        // 任务详情
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
        },
        // 任务编辑
        task2() {
            let task2 = this.$store.getters['editTask'],
                asgList = this.$store.getters['assigneeList'];
            if(!task2 || !task2.asg){
                return {};
            }
            for(let i=0; i<task2.asg.length; i++){
                for(let j=0; j<asgList.length; j++){
                    if(task2.asg[i].id === asgList[j].id)
                    task2.asg[i].name = asgList[j].name;
                }
            }
            return task2;
        },
        isAdmin() {
            return this.$store.getters['isAdmin'];
        }
    },
    methods: {
        exitDetails() {
            this.$store.commit('showDetails', false);
            this.$store.commit('detailedTask', null);
            this.$store.commit('editTask', null);
        },
        goBack() {
            if(this.mode === 0){
                this.exitDetails(); 
            }else if(this.mode === 1){
                this.$store.commit('editTask', null);
                if(this.$store.getters['detailedTask'] === null){
                    this.exitDetails();
                }else{
                    this.mode = 0;
                }
                // TODO
            }else if(this.mode === 2){
                this.$store.commit('editTask', null);
                this.exitDetails();
                this.mode = 0;
            }
        },
        edit() {
            this.$store.commit('editTask', this.$store.getters['detailedTask']);
            this.mode = 1;
        },
        showDeleteDialog() {
            this.showDeleteTaskDialog = true;
        },
        cancelDelete() {
            this.showDeleteTaskDialog = false;
        },
        confirmAdd() {
            new Promise((rs, rj) => {
                this.$store.dispatch('addTask', {rs, rj});
            }).then(() => {
                this.$store.commit('editTask', null);
                this.exitDetails();
                this.mode = 0;
            }, () => {
                // TODO - 显示错误信息
            });
        },
        confirmUpdate() {
            new Promise((rs, rj) => {
                this.$store.dispatch('updateTask', {rs, rj});
            }).then(() => {
                this.$store.commit('editTask', null);
                if(this.$store.getters['detailedTask'] === null){
                    this.exitDetails();
                }else{
                    this.mode = 0;
                }
            }, () => {
                // TODO - 显示错误信息
            });
        },
        confirmDelete() {
            new Promise((rs, rj) => {
                this.$store.dispatch('deleteTask', {rs, rj});
            }).then(() => {
                this.$store.commit('editTask', null);
                this.exitDetails();
                this.mode = 0;
            }, () => {
                // TODO - 显示错误信息
            });
        }
    } 
}
</script>