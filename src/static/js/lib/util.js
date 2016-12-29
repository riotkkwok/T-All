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
    console.log('[vuex-actions] '+timeString(d)+' - '+str.join(' , '));
}

export const clone = (obj) => {
    const cloneObj = (o) => {
        const newO = {};
        for(let key in o){
            switch(getType(o[key])){
                case 'object': {
                    newO[key] = clone(o[key]);
                    break;
                }
                case 'array': {
                    newO[key] = clone(o[key]);
                    break;
                }
                default: {
                    newO[key] = o[key];
                }
            }
        }
        return newO;
    }

    const cloneArray = (o) => {
        const newO = [];
        for(let i=0;  i<o.length; i++){
            switch(getType(o[i])){
                case 'object': {
                    newO[i] = clone(o[i]);
                    break;
                }
                case 'array': {
                    newO[i] = clone(o[i]);
                    break;
                }
                default: {
                    newO[i] = o[i];
                }
            }
        }
        return newO;
    }
    
    let newObj;
    switch(getType(obj)){
        case 'object': {
            newObj = cloneObj(obj);
            break;
        }
        case 'array': {
            newObj = cloneArray(obj);
            break;
        }
        default: {
            newObj = obj;
        }
    }

    return newObj;
}

export const reversePlainObject = (o, dest, dupHandleType) => {
    let result = {};
    for(let key in o){
        if(/array|function|object/.test(getType(o[key]))){
            continue;
        }
        if(result.hasOwnProperty(o[key])){
            if(dupHandleType.toLowerCase() === 'array'){
                result[o[key]] = [].concat(result[o[key]]).concat(key);
            }else if(dupHandleType.toLowerCase() === 'string'){
                result[o[key]] += ','+key;
            }
        }else{
            result[o[key]] = key;
        }
    }
    for(let key in result){
        if(dest.hasOwnProperty(key)){
            continue;
        }
        dest[key] = result[key];
    }
}

export const getType = (o) => {
    return Object.prototype.toString.call(o).toLowerCase().replace(/(\[object )|(\])/g, '');
}