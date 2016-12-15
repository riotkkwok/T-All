<template lang="jade" src="./timeTable.jade"></template>

<style lang="sass" src="./timeTable.scss"></style>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'

import * as myUtil from 'myUtil'

const createDate = (dates, newDates) => {
    for(let i=0; i<newDates.length; i++){
        if(!dates.contains(newDates[i])){
            dates.push(newDates[i]);
        }
    }
    return dates.sort();
}

const createPList = (asignees, dates) => {
    const pplList = {};
    let ppl;
    for(let i=0; i<asignees.length; i++){
        pplList[asignees[i].id] = ppl = {
            name: asignees[i].name,
            leaveType: null
        };
        for(let j=0; j<dates.length; j++){
            ppl[dates[j].dateStr] = [{
                id: null,
                stage: null,
                color: 'transparent'
            },{
                id: null,
                stage: null,
                color: 'transparent'
            }];
        }
    }
    return pplList;
}

export default {
    mounted() {
        this.needRender = true;
    },
    data(){
        return {
            startDate: this.$store.getters['startDate'],
            nowDate: this.$store.getters['nowDate'],
            endDate: this.$store.getters['endDate'],
            taskList: this.$store.getters['taskList'],
            needRender: false
        };
    },
    computed: {
        dateListUI() {
            let nEl = 0, dEl = 0;
            if(this.needRender && !!document.querySelector('.tt-name')){
                nEl = document.querySelector('.tt-name').clientWidth || 0;
            }
            if(this.needRender && !!document.querySelector('.tt-date')){
                dEl = document.querySelector('.tt-date').clientWidth || 0;
            }
            return {
                width: (nEl + this.dateList.length * dEl + 10)+'px'
            };
        },
        dateList() {
            const dList = [], sd = new Date(this.startDate), ed = new Date(this.endDate);
            let d = sd;
            while(true){
                dList.push({
                    dateStr: myUtil.dateString(d),
                    dateStr2: myUtil.dateString2(d)
                });
                if(d >= ed){
                    break;
                }else{
                    d.setDate(d.getDate()+1);
                }
            }
            return dList;
        },
        pplList() {
            const pplList = createPList(this.$store.getters['assigneeList'], this.dateList);
            let task, ppl, eff, i, j, k;
            for(i=0; i<this.taskList.length; i++){
                task = this.taskList[i];
                for(j=0; j<task.asg.length; j++){ // 遍历参与人
                    ppl = pplList[task.asg[j].id];
                    eff = task.asg[j].effort;
                    for(let key in eff){ // 遍历工作阶段
                        for(k=0; k<eff[key].length; k++){ // 遍历每阶段的工作日期
                            if(ppl[eff[key][k]][task.nth].id !== null){
                                console.error("Multi-tasks in the same place.");
                            }else{
                                ppl[eff[key][k]][task.nth] = {
                                    id: task.id,
                                    stage: key,
                                    color: task.color
                                };
                            }
                        }
                    }
                }
            }
            return pplList;
        }
    },
    methods: {
    }
};

</script>