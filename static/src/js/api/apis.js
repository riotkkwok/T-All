import { ajax } from 'ajax'

const isDebug = false;
const apiList = {

    // 用户信息
    queryUserInfo: '/apis/queryUserInfo',
    // 日期信息
    queryDateInfo: '/apis/queryDateInfo',
    // 参与者列表
    queryAssigneeList: '/apis/queryAssigneeList',
    // 任务列表
    queryTaskList: '/apis/queryTaskList',

    // 登录
    login: '/apis/login',
    // 登出
    logout: '/apis/logout',

    // 准备创建任务
    preAddTask: '/apis/preAddTask',
    // 新增任务
    addTask: '/apis/addTask',
    // 修改任务
    updateTask: '/apis/updateTask',
    // 删除任务
    deleteTask: '/apis/deleteTask',
    // 新增休假
    addLeave: '/apis/addLeave',
    // 修改休假
    updateLeave: '/apis/updateLeave',
    // 删除休假
    deleteLeave: '/apis/deleteLeave',

    // 更新参与者列表
    adjustAssigneeList: '/apis/adjustAssigneeList'
};

export const request = (name, options, sucFn, errFn) => {
    let url;
    if(!!isDebug){
        url = '../mockApi/'+ name +'.json';
        options.dataType = 'text';
    }else{
        url = apiList[name];
    }
    ajax({
        url: url,
        type: options.type || 'GET',
        data: options.data || {},
        dataType: options.dataType || 'text',
        success(resp) {
            sucFn(resp);
        },
        error(e) {
            errFn(e);
        }
    });
}