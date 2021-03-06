<template lang="jade" src="./timeTable.jade"></template>

<style lang="sass" src="./timeTable.scss"></style>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'

import * as myUtil from 'myUtil'
import { stageList } from 'staticInfo'
import { newSingleTask } from 'dataFactory'

const createPList = (assignees, dates) => {
    const pplList = {};
    let ppl;
    for(let i=0; i<assignees.length; i++){
        pplList[assignees[i].id] = ppl = {
            name: assignees[i].name,
            id: assignees[i].id
        };
        for(let j=0; j<dates.length; j++){
            ppl[dates[j].dateStr] = [{
                id: null,
                stage: null,
                color: 'transparent',
                editable: false
            },{
                id: null,
                stage: null,
                color: 'transparent',
                editable: false
            },{
                leaveType: (assignees[i].leaves && assignees[i].leaves[dates[j].dateStr]) ? assignees[i].leaves[dates[j].dateStr].type : null,
                leaveDuration: (assignees[i].leaves && assignees[i].leaves[dates[j].dateStr]) ? assignees[i].leaves[dates[j].dateStr].time : null
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
    created() {
        this.$on('update', function(){
            this.startDate = this.$store.getters['startDate'],
            this.nowDate = this.$store.getters['nowDate'],
            this.endDate = this.$store.getters['endDate'],
            this.taskList = this.$store.getters['taskList'];
            if(this.$store.getters['assigneeList'].length  === 0 
                || this.startDate === null 
                || this.nowDate === null 
                || this.endDate === null 
                || this.taskList.length === 0){
                return;
            }
            this.pplList = this.runPplList();
            this.needRender = true;
            this.visibleArea();
        });
    },
    mounted() {
        console.debug('timeTable mounted');
        // this.pplList = this.runPplList();
        this.needRender = true;
        window.onresize = this.visibleArea;
        // this.visibleArea();
    },
    data(){
        return {
            startDate: this.$store.getters['startDate'],
            nowDate: this.$store.getters['nowDate'],
            endDate: this.$store.getters['endDate'],
            taskList: this.$store.getters['taskList'],
            needRender: false,
            scrolling: false,
            curTask: [],
            daylyWork: '',
            lastEditDay: null,
            pplList: {},
            autoFocusInput: true,
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
                    isPH: this.$store.getters['holidayList'].indexOf(myUtil.dateString(d)) >= 0,
                    isSW: this.$store.getters['spWorkingList'].indexOf(myUtil.dateString(d)) >= 0
                });
                if(d >= ed){
                    break;
                }else{
                    d.setDate(d.getDate()+1);
                }
            }
            return dList;
        },
        editTask() {
            return this.$store.getters['editTask'];
        },
        taskAsg: {
            get() {
                let taskAsg = {}, editTask = this.editTask,
                    asgList = this.$store.getters['assigneeList'];
                if((this.mode !== 1 && this.mode !== 2) || !editTask){
                    return {};
                }
                for(let i=0; i<editTask.asg.length; i++){
                    taskAsg[editTask.asg[i].id] = {
                        name: editTask.asg[i].name,
                        id: editTask.asg[i].id
                    };
                    myUtil.reversePlainObject(editTask.asg[i].effort, taskAsg[editTask.asg[i].id]);
                }
                for(let j=0; j<asgList.length; j++){
                    if(!taskAsg[asgList[j].id]){
                        taskAsg[asgList[j].id] = {
                            name: asgList[j].name,
                            id: asgList[j].id
                        }
                    }
                }
                return taskAsg;
            },
            set(ta) {
                let taskAsg = {}, editTask = this.$store.getters['editTask'];
            }
        },
        // 当前可视区域内包含的任务
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
        showAddTaskDialog() {
            return this.$store.getters['showAddTaskDialog'];
        },
        mode: {
            set(val) {
                this.$store.commit('mode', val);
            },
            get() {
                return this.$store.getters['mode'];
            }
        }
    },
    watch: {
        // 上一个编辑的日期
        lastEditDay(val) {
            this.pplList = this.runPplList(val);
        },
        mode(val){
            if(val === 0){
                this.pplList = this.runPplList(val);
            }
        },
        '$store.getters.toUpdateTable': function(val) {
            if(!!val){
                this.$emit('update');
                this.$store.commit('toUpdateTable', false);
            }
        } 
    },
    directives: {
        focus: {
            inserted: function (el, {value}) {
                if (value) {
                    el.focus();
                }
            }
        }
    },
    methods: {
        // 生成参与人的任务列表（对应页面表格的ViewModel）
        runPplList(lastT) {
            myUtil.logger(['runPplList'], 'me');
            let task, ppl, eff, i, j, k;
            // 
            if(!!lastT){
                const pplListExist = this.pplList;
                // 追加正在编辑的任务，进行显示
                if(this.$store.getters['isAdmin'] && (this.mode === 1 || this.mode === 2) && !!this.editTask){
                    let editTask = this.editTask;
                    // 遍历编辑中任务的参与人
                    for(i=0; i<editTask.asg.length; i++){
                        ppl = editTask.asg[i];
                        eff = editTask.asg[i].effort;
                        // 遍历工作阶段
                        for(let key in eff){
                            // 遍历每阶段的工作日期
                            for(let j=0; j<eff[key].length; j++){
                                k = pplListExist[ppl.id][eff[key][j]][ppl.nth];
                                k.id = editTask.id;
                                k.color = editTask.color;
                                k.stage = key;
                            }
                        }
                    }
                }
                return pplListExist;
            }
            const pplList = createPList(this.$store.getters['assigneeList'], this.dateList);
            // 遍历任务列表
            for(i=0; i<this.taskList.length; i++){
                task = this.taskList[i];
                // 遍历参与人
                for(j=0; j<task.asg.length; j++){
                    ppl = pplList[task.asg[j].id];
                    eff = task.asg[j].effort;
                    // 遍历工作阶段
                    for(let key in eff){
                        // 遍历每阶段的工作日期
                        for(k=0; k<eff[key].length; k++){
                            if(ppl[eff[key][k]][2].leaveType && ppl[eff[key][k]][2].leaveDuration === 'ALL'){
                                // No task to display
                            }else if(ppl[eff[key][k]][task.asg[j].nth].id !== null){
                                console.error("Multi-tasks in the same place.");
                            }else{
                                ppl[eff[key][k]][task.asg[j].nth] = {
                                    id: task.id,
                                    stage: key,
                                    color: task.color,
                                    editable: false
                                };
                            }
                        }
                    }
                }
            }
            return pplList;
        },
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
        // 计算可视区域内的任务列表
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
                tmpDate = new Date(va.startDate);
                while(tmpDate <= va.endDate && tmpDate <= new Date(this.endDate)){
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
            if(this.$store.getters['showDetails'] && (this.mode === 1 || this.mode ===2)){
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
        },
        selectTask(t, pplId, nth) {
            myUtil.logger(['selectTask'], 'me');
            if(!!t.editable && t === this.lastEditDay){
                return;
            }
            if(t.id === null || (this.editTask && t.id === this.editTask.id)){
                if(this.$store.getters['isAdmin']){
                    if(this.mode === 0){
                        this.$store.commit('showAddTaskDialog', true);  
                    }else if(this.mode === 1 || this.mode === 2){
                        // 判断点击日期的位置是否合法
                        for(let i=0; i<this.editTask.asg.length; i++){
                            if(this.editTask.asg[i].id === pplId && nth !== this.editTask.asg[i].nth){ 
                                // 若已参与者位置不一致则忽略
                                return;
                            }
                        }
                        if(!t.editable){ // 不是正在编辑
                            this.daylyWork = t.stage || '';
                            if(!!this.lastEditDay){
                                this.lastEditDay.editable = false;
                            }
                            t.editable = true;
                            this.lastEditDay = t;
                        }
                    }
                }
            }else{
                this.viewDetail(t.id);
            }
        },
        unselectTask() {
            // console.log('unselectTask');
            if(this.$store.getters['isAdmin'] && (this.mode === 1 || this.mode === 2)){
                this.daylyWork = '';
                if(!!this.lastEditDay){
                    this.lastEditDay.editable = false;
                }
                this.lastEditDay = {};
            }
        },
        selectNext(t, pplId, nth) {
            const that = this;
            this.unselectTask();

            if(!t || !t[nth]){
                console.warn('It is the last date to be editted.');
                return;
            }
            if(!!t[nth].id && !!t[nth].stage){
                console.warn('It is unavailable at that day.');
                return;
            }

            // 注意：这是一个保证watch lastEditDay按顺序执行的hack
            setTimeout(function(){
                that.selectTask(t[nth], pplId, nth);
            }, 100);
        },
        goBack() {
            this.$store.commit('showAddTaskDialog', false);
        },
        addTask() {
            new Promise((rs, rj) => {
                this.$store.dispatch('preAddTask', {rs, rj});
            }).then(() => {
                this.$store.commit('showAddTaskDialog', false);
                this.$store.commit('showDetails', true);
                this.mode = 2;
            }, () => {
                this.$store.commit('showAddTaskDialog', false);
                this.$store.commit('showDetails', true);
                // TODO - 错误处理
            });
        },
        updateTask(pplId, pplName, dateStr, nth) {
            myUtil.logger(['updateTask'], 'me');
            let editTask = this.editTask, index;
            if(stageList.indexOf(this.daylyWork) < 0){ // 非法阶段值
                for(let i=0; i<editTask.asg.length; i++){ // 遍历查找项目参与者
                    if(editTask.asg[i].id === pplId){
                        let isEngaged = false, 
                            done = false,
                            eff = editTask.asg[i].effort,
                            j;
                        for(let s in eff){ // 遍历阶段找到当前编辑日期
                            j = eff[s].indexOf(dateStr);
                            if(j >= 0){
                                // 删除当前日期
                                console.log('remove date');
                                eff[s].splice(j, 1);
                                this.pplList[pplId][dateStr][nth].id = null;
                                this.pplList[pplId][dateStr][nth].stage = null;
                                this.pplList[pplId][dateStr][nth].color = 'transparent';
                                done = true;
                            }
                            if(eff[s].length>0){ // 还有其他日期参与项目
                                isEngaged = true;
                            }
                            if(!!isEngaged && !!done){
                                break;
                            }
                        }
                        if(!isEngaged){
                            // 没有其他日期参与项目，移除参与者
                            console.log('remove asg');
                            editTask.asg.splice(i, 1);
                        }
                        break;
                    }
                }
            }else{ // 合法阶段值
                if(editTask.asg.length === 0){ // 新建任务无参与者
                    myUtil.addToList(editTask, 'asg', {
                        id: pplId,
                        name: pplName,
                        effort: {},
                        nth: nth
                    });
                }
                // 添加未参与项目的参与者
                for(let i=0; i<editTask.asg.length; i++){
                    if(editTask.asg[i].id === pplId){
                        index = i;
                        break;
                    }
                    if(i+1 === editTask.asg.length){
                        myUtil.addToList(editTask, 'asg', {
                            id: pplId,
                            name: pplName,
                            effort: {},
                            nth: nth
                        });
                        index = i + 1;
                    }
                }
                myUtil.addToList(editTask.asg[index].effort, this.daylyWork, dateStr, true);
            }
            this.$store.commit('editTask', editTask);
        },
        nextDate(ds) {
            const d = new Date(ds);
            d.setDate(d.getDate()+1);
            return myUtil.dateString(d);
        },
        goToLeavePage(pplId, pplName) {
            if(this.$store.getters['isLogined'] && this.$store.getters['isAdmin']){
                this.$store.commit('leaveTaker', {id: pplId, name: pplName})
                this.$router.push('/leaves');
            }
        }
    }
};

</script>