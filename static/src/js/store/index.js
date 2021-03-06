import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import { publicHoliday, specialWorkingDay } from 'staticInfo'

Vue.use(Vuex);

const state = {
    showLoginPanel: false,
    showDetails: false,
    showEditingToast: false,
    showAddTaskDialog: false,
    mode: 0, // 0是浏览模式，1是更新模式，2是新增模式
    userInfo: {},
    startDate: null,
    nowDate: null,
    endDate: null,
    holidayList: publicHoliday || [],
    spWorkingList: specialWorkingDay || [],
    taskList: [],
    assigneeList: [],
    detailedTask: null,
    editTask: null,
    toUpdateTable: false, // 是否更新表格UI
    leaveTaker: null, // 请假者
    leaveList: [] // 休假列表
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

export default store