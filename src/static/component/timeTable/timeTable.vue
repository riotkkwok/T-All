<template lang="jade" src="./timeTable.jade"></template>

<style lang="sass" src="./timeTable.scss"></style>

<script>
// import Tmpl from './timeTable.jade'
// import './timeTable.scss'

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

export default {
    data(){
        return {
            startDate: this.$store.getters['startDate'],
            nowDate: this.$store.getters['nowDate'],
            endDate: this.$store.getters['endDate'],
            taskList: this.$store.getters['taskList']
            // return mapState(['startDate', 'nowDate', 'endDate', 'taskList'])
        };
    },
    computed: {
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
            const pplList = {}, asgList = this.$store.getters['assigneeList'];
            let tmp, ppl, task, eff, i, j, k;
            for(i=0; i<asgList.length; i++){
                pplList[asgList[i].id] = {
                    name: asgList[i].name
                };
            }
            for(i=0; i<this.taskList.length; i++){
                tmp = taskList[i];
                for(j=0; j<tmp.asg.length; j++){
                    ppl = pplList[tmp.asg[j].id];
                    eff = tmp.asg[j].effort;
                    for(let key in eff){
                        for(k=0; k<eff[key]; k++){
                            myUtil.addToList(ppl[eff[key]].tasks, {
                                id: tmp.id,
                                stage: key
                            });
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