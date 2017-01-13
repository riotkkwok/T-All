import * as myUtil from 'myUtil'
import { request } from 'apis'

export const init = ({commit}, rs, rj) => {
    // 初始化数据

    const update = (function(){
        let reqCount = 0;
        const totalReq = 1;

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
    // 获取日期信息
    // 获取参与者列表
    // 获取任务列表
    queryTaskList({commit}, update);
}

export const userLogout = ({commit}) => {
    // TODO
    myUtil.logger(['userLogout()'], 'a');
};

export const userLogin = ({commit}) => {
    // TODO
    myUtil.logger(['userLogin()'], 'a');
};

export const queryTaskList = ({commit}, updFn) => {
    request('queryTaskList', function(resp){
        commit('taskList', resp.data);
        if(typeof updFn === 'function'){
            updFn();
        }
    }, function(e){
        myUtil.logger(['queryTaskList()', 'ajax error'], 'a');
        if(typeof updFn === 'function'){
            updFn(1);
        }
        // TODO - 处理错误情况
    });
}