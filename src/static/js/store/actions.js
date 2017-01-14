import * as myUtil from 'myUtil'
import { request } from 'apis'

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
    // TODO
    myUtil.logger(['userLogout()'], 'a');
};

export const userLogin = ({commit}) => {
    // TODO
    myUtil.logger(['userLogin()'], 'a');
};

export const queryUserInfo = ({commit}, counterFn) => {
    request('queryUserInfo', function(resp){
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
    request('queryDateInfo', function(resp){
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
    request('queryAssigneeList', function(resp){
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
    request('queryTaskList', function(resp){
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