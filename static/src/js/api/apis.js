import { ajax } from 'ajax'

const isDebug = true;
const apiList = {

    // 用户信息
    queryUserInfo: '',
    // 日期信息
    queryDateInfo: '',
    // 参与者列表
    queryAssigneeList: '',
    // 任务列表
    queryTaskList: '',

    // 登录
    login: '',
    // 登出
    logout: '',

    // 准备创建任务
    preAddTask: '',
    // 新增任务
    addTask: '',
    // 修改任务
    updateTask: '',
    // 删除任务
    deleteTask: '',
    // 新增休假
    addLeave: '',
    // 修改休假
    updateLeave: '',
    // 删除休假
    deleteLeave: '',

    // 更新参与者列表
    adjustAssigneeList: ''
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