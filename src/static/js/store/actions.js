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
    const d = new Date(),
        ds = (d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()).replace(/\b([0-9]{1})\b/g, '0$1');
    console.log('[vuex-actions] '+ds+' - '+str.join(' , '));
}