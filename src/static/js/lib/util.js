export const dateString = (d) => {
    return (d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()).replace(/\b([0-9]{1})\b/g, '0$1')
}

export const dateString2 = (d) => {
    // var mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (d.getMonth()+1)+'/'+d.getDate();
}

export const dayString = (d) => {
    const weekday = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
    return weekday[d.getDay()];
}

export const timeString = (d) => {
    return (d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()).replace(/\b([0-9]{1})\b/g, '0$1')
}

export const addToList = (obj, key, val) => {
    if(obj.hasOwnProperty(key)){
        obj[key].push(val);
    }else{
        obj[key] = [val];
    }
}

export const logger = (...str) => {
    const d = new Date();
    console.log('[vuex-actions] '+myUtil.timeString(d)+' - '+str.join(' , '));
}