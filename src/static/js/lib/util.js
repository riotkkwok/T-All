export const dateString = (d) => {
    return (d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()).replace(/\b([0-9]{1})\b/g, '0$1')
}

export const dateString2 = (d) => {
    var mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return d.getDate()+'-'+mon[d.getMonth()];
}

export const timeString = (d) => {
    return (d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()).replace(/\b([0-9]{1})\b/g, '0$1')
}

export const addToList = (obj, val) => {
    if(obj instanceOf Array){
        obj.push(val);
    }else{
        obj = [val];
    }
}