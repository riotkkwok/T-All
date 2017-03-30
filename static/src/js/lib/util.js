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

export const addToList = (obj, key, val, filterDupl) => {
    if(obj.hasOwnProperty(key)){
        if(!!filterDupl && obj[key].indexOf(val) >= 0){
            // do nothing
        }else{
            obj[key].push(val);
        }
    }else{
        obj[key] = [val];
    }
}

export const logger = (strs, type) => {
    const d = new Date();
    let t;
    switch(type){
        case 'a': t = '[vuex-actions] '; break;
        case 'c': t = '[vue-component-computed] '; break;
        case 'd': t = '[vue-component-data] '; break;
        case 'f': t = '[vue-filters] '; break;
        case 'g': t = '[vuex-getters] '; break;
        case 'me': t = '[vue-component-methods] '; break;
        case 'm': t = '[vue-component-mounted] '; break;
        case 'mu': t = '[vuex-mutations] '; break;
        case 'w': t = '[vue-component-watch] '; break;
        default: '[] ';
    }
    console.log(t+timeString(d)+' - '+strs.join(' , '));
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
        if(/function|object/.test(getType(o[key]))){
            continue;
        }else if(getType(o[key]) === 'array'){
            for(let i=0; i<o[key].length; i++){
                if(/array|function|object/.test(getType(o[key][i]))){
                    continue;
                }
                keyValReverse(key, o[key][i]);
            }
            continue;
        }
        keyValReverse(key, o[key]);
    }
    for(let key in result){
        if(dest.hasOwnProperty(key)){
            continue;
        }
        dest[key] = result[key];
    }

    function keyValReverse(key, val){
        if(result.hasOwnProperty(val)){
            if(dupHandleType.toLowerCase() === 'array'){
                result[val] = [].concat(result[val]).concat(key);
            }else if(dupHandleType.toLowerCase() === 'string'){
                result[val] += ','+key;
            }
        }else{
            result[val] = key;
        }
    }
}

export const getType = (o) => {
    return Object.prototype.toString.call(o).toLowerCase().replace(/(\[object )|(\])/g, '');
}

export const getCookie = (key) => {
    const arr = document.cookie.replace(/ /g, '').match(new RegExp('(?:^|;)'+ key +'(?:=)([^;]*)'));
    if(arr && arr.length > 1){
        return arr[1];
    }else{
        return undefined;
    }
}