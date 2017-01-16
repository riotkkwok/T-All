import * as myUtil from 'myUtil'
import { request } from 'apis'
import { newSingleTask } from 'dataFactory'

export const init = ({commit}, rs, rj) => {
    // 初始化数据

    const counter = (function(){
        let reqCount = 0;
        const totalReq = 4;

        return function(isFailed){
            if(!!isFailed){
                reqCount = -Infinity;
                rj();
            }else{
                reqCount++;
                if(reqCount === totalReq){
                    rs();
                }
            }
        }
    })();

    // 获取用户信息
    queryUserInfo({commit}, counter);

    // 获取日期信息
    queryDateInfo({commit}, counter);

    // 获取参与者列表
    queryAssigneeList({commit}, counter);

    // 获取任务列表
    queryTaskList({commit}, counter);
}

export const userLogout = ({commit}) => {
    request('login', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        commit('userInfo', {});
    }, function(e){
        myUtil.logger(['queryUserInfo()', 'ajax error'], 'a');
        commit('userInfo', {});
    });
    myUtil.logger(['userLogout()'], 'a');
};

export const userLogin = ({commit}) => {
    request('login', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        if(resp.code === 0 && resp.result === 0){
            queryUserInfo({commit});
        }else{
            // TODO - 显示登录失败
        }
    }, function(e){
        myUtil.logger(['queryUserInfo()', 'ajax error'], 'a');
        // TODO - 处理错误情况
    });
    myUtil.logger(['userLogin()'], 'a');
};

export const queryUserInfo = ({commit}, counterFn) => {
    request('queryUserInfo', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        commit('userInfo', resp.data);
        if(typeof counterFn === 'function'){
            counterFn();
        }
    }, function(e){
        myUtil.logger(['queryUserInfo()', 'ajax error'], 'a');
        if(typeof counterFn === 'function'){
            counterFn(1);
        }
        // TODO - 处理错误情况
    });
}

export const queryDateInfo = ({commit}, counterFn) => {
    request('queryDateInfo', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        commit('dateInfo', resp.data);
        if(typeof counterFn === 'function'){
            counterFn();
        }
    }, function(e){
        myUtil.logger(['queryDateInfo()', 'ajax error'], 'a');
        if(typeof counterFn === 'function'){
            counterFn(1);
        }
        // TODO - 处理错误情况
    });
}

export const queryAssigneeList = ({commit}, counterFn) => {
    request('queryAssigneeList', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        commit('assigneeList', resp.data);
        if(typeof counterFn === 'function'){
            counterFn();
        }
    }, function(e){
        myUtil.logger(['queryAssigneeList()', 'ajax error'], 'a');
        if(typeof counterFn === 'function'){
            counterFn(1);
        }
        // TODO - 处理错误情况
    });
}

export const queryTaskList = ({commit}, counterFn) => {
    request('queryTaskList', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        commit('taskList', resp.data);
        if(typeof counterFn === 'function'){
            counterFn();
        }
    }, function(e){
        myUtil.logger(['queryTaskList()', 'ajax error'], 'a');
        if(typeof counterFn === 'function'){
            counterFn(1);
        }
        // TODO - 处理错误情况
    });
}

export const preAddTask = ({commit}, rs, rj) => {
    request('preAddTask', {
        type: 'GET',
        dataType: 'json',
        data: {}
    }, function(resp){
        if(!!resp.data){
            const task = newSingleTask(resp.data.id, resp.data.color);
            commit('editTask', task);
            rs();
            return;
        }
        rj();
    }, function(e){
        myUtil.logger(['preAddTask()', 'ajax error'], 'a');
        rj();
        // TODO - 处理错误情况
    });
}
