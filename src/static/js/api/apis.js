import { ajax } from 'ajax'

const isDebug = true;
const apiList = {
    queryUserInfo: '',
    queryTaskList: ''
};

export const request = (name, sucFn, errFn) => {
    let url;
    if(!!isDebug){
        url = '../mockApi/'+ name +'.json';
    }else{
        url = apiList[name];
    }
    ajax({
        url: url,
        type: 'GET',
        data: {},
        dataType: 'text',
        success(resp) {
            sucFn(resp);
        },
        error(e) {
            sucFn(e);
        }
    });
}