import * as myUtil from 'myUtil'
import { request } from 'apis'

export const init = ({commit}) => {
    // 初始化数据

    // 获取用户信息
    // 获取日期信息
    // 获取参与者列表
    // 获取任务列表
    queryTaskList({commit});
}

export const userLogout = ({commit}) => {
    // TODO
    myUtil.logger(['userLogout()'], 'a');
};

export const userLogin = ({commit}) => {
    // TODO
    myUtil.logger(['userLogin()'], 'a');
};

export const queryTaskList = ({commit}) => {
    request('queryTaskList', function(resp){
        commit('taskList', resp.data);
    }, function(e){
        myUtil.logger(['queryTaskList()', 'ajax error'], 'a');
        // TODO - 处理错误情况
    });
}