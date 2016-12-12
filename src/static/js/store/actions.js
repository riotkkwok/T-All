import myUtil from 'myUtil'

export const userLogout = ({commit}) => {
    // TODO
    logger(['userLogout()']);
};

export const userLogin = ({commit}) => {
    // TODO
    logger(['userLogin()']);
};

function ajax(options){
    // TODO
}

function logger(...str){
    const d = new Date();
    console.log('[vuex-actions] '+myUtil.timeString(d)+' - '+str.join(' , '));
}