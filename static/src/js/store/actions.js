import * as myUtil from 'myUtil'
import { request } from 'apis'
import { newSingleTask } from 'dataFactory'

// 初始化数据
export const init = ({commit}) => {
    // 获取用户信息
    queryUserInfo({commit});

    // 获取日期信息
    queryDateInfo({commit});

    // 获取参与者列表
    queryAssigneeList({commit});

    // 获取任务列表
    queryTaskList({commit});
}

export const userLogout = ({commit}) => {
    request('logout', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        commit('userInfo', {});
    }, function(e){
        myUtil.logger(['userLogout()', 'ajax error'], 'a');
        commit('userInfo', {});
    });
    myUtil.logger(['userLogout()'], 'a');
};

export const userLogin = ({commit}, {param, rs, rj}) => {
    request('login', {
        type: 'POST',
        dataType: 'json',
        data: param
    }, function(resp){
        if(resp.code === 0 && resp.data.result === 0){
            commit('userInfo', resp.data);
            rs();
        }else{
            // TODO - 显示登录失败
            rj();
        }
    }, function(e){
        myUtil.logger(['userLogin()', 'ajax error'], 'a');
        // TODO - 处理错误情况
        rj();
    });
    myUtil.logger(['userLogin()'], 'a');
};

export const queryUserInfo = ({commit}, {rs, rj}={}) => {
    request('queryUserInfo', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        commit('userInfo', resp.data);
        rs && rs();
    }, function(e){
        myUtil.logger(['queryUserInfo()', 'ajax error'], 'a');
        rj && rj();
        // TODO - 处理错误情况
    });
}

export const queryDateInfo = ({commit}, {rs, rj}={}) => {
    request('queryDateInfo', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        commit('dateInfo', resp.data);
        rs && rs();
    }, function(e){
        myUtil.logger(['queryDateInfo()', 'ajax error'], 'a');
        rj && rj();
        // TODO - 处理错误情况
    });
}

export const queryAssigneeList = ({commit}, {rs, rj}={}) => {
    request('queryAssigneeList', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        commit('assigneeList', resp.data);
        commit('toUpdateTable', true);
        rs && rs();
    }, function(e){
        myUtil.logger(['queryAssigneeList()', 'ajax error'], 'a');
        rj && rj();
        // TODO - 处理错误情况
    });
}

export const queryTaskList = ({commit}, {rs, rj}={}) => {
    request('queryTaskList', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        commit('taskList', resp.data);
        commit('toUpdateTable', true);
        rs && rs();
    }, function(e){
        myUtil.logger(['queryTaskList()', 'ajax error'], 'a');
        rj && rj();
        // TODO - 处理错误情况
    });
}

export const preAddTask = ({commit}, {rs, rj}) => {
    request('preAddTask', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        if(!!resp.data){
            const task = newSingleTask(resp.data.id, resp.data.color);
            commit('editTask', task);
            rs();
        }else{
            rj();
        }
    }, function(e){
        myUtil.logger(['preAddTask()', 'ajax error'], 'a');
        rj();
        // TODO - 处理错误情况
    });
}

export const addTask = ({commit, getters}, {rs, rj}) => {
    request('addTask', {
        type: 'GET',
        dataType: 'json',
        data: getters['editTask']
    }, function(resp){
        if(resp.code === 0 && resp.data.result === 0){
            // TODO - to be enhanced
            // 更改为不需要重新拉取任务列表
            queryTaskList({commit}, {rs, rj});
        }else{
            rj();
        }
    }, function(e){
        myUtil.logger(['addTask()', 'ajax error'], 'a');
        rj();
        // TODO - 处理错误情况
    });
}

export const updateTask = ({commit, getters}, {rs, rj}) => {
    request('updateTask', {
        type: 'GET',
        dataType: 'json',
        data: getters['editTask']
    }, function(resp){
        if(resp.code === 0 && resp.data.result === 0){
            commit('detailedTask', getters['editTask']);
            queryTaskList({commit}, {rs, rj});
        }else{
            rj();
        }
    }, function(e){
        myUtil.logger(['updateTask()', 'ajax error'], 'a');
        rj();
        // TODO - 处理错误情况
    });
}

export const deleteTask = ({commit, getters}, {rs, rj}) => {
    request('deleteTask', {
        type: 'GET',
        dataType: 'json',
        data: {
            deleteId: getters['editTask'].id
        }
    }, function(resp){
        if(resp.code === 0 && resp.data.result === 0){
            queryTaskList({commit}, {rs, rj});
        }else{
            rj();
        }
    }, function(e){
        myUtil.logger(['deleteTask()', 'ajax error'], 'a');
        rj();
        // TODO - 处理错误情况
    });
}
