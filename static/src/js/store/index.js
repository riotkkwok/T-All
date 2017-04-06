import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

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
    holidayList: [],
    taskList: [],
    assigneeList: [],
    detailedTask: null,
    editTask: null,
    toUpdateTable: false, // 是否更新表格UI
    toUpdateHeader: false // 是否更新页头
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

export default store