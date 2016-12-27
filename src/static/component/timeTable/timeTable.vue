<template lang="jade" src="./timeTable.jade"></template>

<style lang="sass" src="./timeTable.scss"></style>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'

import * as myUtil from 'myUtil'

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

const pushTask = (tList, tId) => {
    if(tId !== null && typeof tId === 'string' && tList.indexOf(tId) === -1){
        tList.push(tId);
    }
}

export default {
    mounted() {
        this.needRender = true;
        window.onresize = this.visibleArea;
        this.visibleArea();
    },
    data(){
        return {
            startDate: this.$store.getters['startDate'],
            nowDate: this.$store.getters['nowDate'],
            endDate: this.$store.getters['endDate'],
            taskList: this.$store.getters['taskList'],
            needRender: false,
            scrolling: false,
            curTask: []
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
                    dateStr2: myUtil.dateString2(d),
                    dayStr: myUtil.dayString(d),
                    isWE: !(d.getDay() % 6),
                    isPH: !!this.$store.getters['holidayList'][myUtil.dateString(d)]
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
        },
        taskView: {
            set(ls){
                this.curTask = ls;
            },
            get(){
                return this.curTask;
            }
        },
        showEditingToast() {
            return this.$store.getters['showEditingToast'];
        },
        mode() {
            return this.$store.getters['mode'];
        }
    },
    methods: {
        delayScroll(fn) {
            const that = this;
            if(!!that.scrolling){
                return;
            }else{
                that.scrolling = true;
                setTimeout(function(){
                    that.scrolling = false;
                    fn.call();
                }, 1000);
            }
        },
        visibleArea() {
            const wpRect = document.querySelector('.tt-wrapper').getBoundingClientRect(),
                hcW = document.querySelector('.tt-headCol').clientWidth,
                dtRect = document.querySelector('.tt-dateList > .tt-date').getBoundingClientRect(),
                va = {
                    start: parseInt(-1*(dtRect.left-wpRect.left-hcW) / dtRect.width, 10),
                    size: Math.ceil((wpRect.width-hcW) / dtRect.width)
                };
            let tmp, tmpDate, result = [];
            if(va.start < 0){
                va.start = 0;
            }
            va.startDate = (new Date(this.startDate));
            va.startDate.setDate(this.startDate.getDate()+va.start)
            va.endDate = (new Date(va.startDate))
            va.endDate.setDate(va.startDate.getDate()+va.size-1);
            for(let id in this.pplList){
                tmp = this.pplList[id];
                tmpDate = va.startDate;
                while(tmpDate <= va.endDate){
                    pushTask(result, tmp[myUtil.dateString(tmpDate)][0].id);
                    pushTask(result, tmp[myUtil.dateString(tmpDate)][1].id);
                    tmpDate.setDate(tmpDate.getDate() + 1);
                }
            }
            for(let i=0, j; i<this.taskList.length; i++){
                // TODO(enhance) - 提前生成一个以id和name为映射的对象进行查找
                j = result.indexOf(this.taskList[i].id);
                if(j >= 0){
                    result[j] = this.taskList[i];
                }
            }
            this.curTask = result;
        },
        viewDetail(tId) {
            let t;
            const that = this;
            if(this.$store.getters['showDetails'] && this.$store.getters['mode'] === 1){
                this.$store.commit('showEditingToast', true);
                setTimeout(function(){
                    that.$store.commit('showEditingToast', false);
                }, 3000);
                return;
            }
            for(let i=0; i<this.taskList.length; i++){
                if(this.taskList[i].id === tId){
                    t = this.taskList[i];
                    break;
                }
            }
            this.$store.commit('detailedTask', t);
            this.$store.commit('showDetails', true);
        }
    }
};

</script>