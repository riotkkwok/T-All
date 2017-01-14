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
    mode: 0,
    userInfo: {},
    startDate: null,
    nowDate: null,
    endDate: null,
    holidayList: [],
    taskList: [],
    assigneeList: [],
    detailedTask: null,
    editTask: null
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

export default store