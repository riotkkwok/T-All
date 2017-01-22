import * as myUtil from 'myUtil'
import resp from 'resp';

const types = {
    obj: 'object',
    arr: 'array',
    num: 'number',
    str: 'string',
    bool: 'boolean',
    func: 'function'
}

const check = (r, o, ko) => {
    let result = {};
    if(o instanceof Array){
        return check4Array(r, o);
    }
    for(let k in r){
        if(o.hasOwnProperty(k)){
            if(myUtil.getType(r[k]) === myUtil.getType(o[k])){
                if(myUtil.getType(r[k]) === types.obj){
                    result[k] = check(r[k], o[k]);
                }else if(myUtil.getType(r[k]) === types.arr){
                    result[k] = check4Array(r[k], o[k]);
                }else{
                    result[k] = o[k];
                }
            }else{
                throw new Error('Unmatch data type.');
            }
        }
    }
    if(JSON.stringify(result) === '{}' && !ko){
        result = undefined;
    }
    return result;
}

const check4Array = (r, o) => {
    let result = [], tmp;
    if(o.length === 0){
        return o;
    }
    for(let i=0, j=0; i<o.length; i++){
        if(myUtil.getType(r[0]) === myUtil.getType(o[i])){
            if(myUtil.getType(o[i]) === types.obj){
                tmp = check(r[0], o[i])
                if(tmp !== undefined){
                    result[j++] = tmp;
                }
            }else if(myUtil.getType(o[i]) === types.arr){
                tmp = check4Array(r[0], o[i]);
                if(tmp !== undefined){
                    result[j++] = tmp;
                }
            }else{
                result[j++] = o[i];
            }
        }else{
            throw new Error('Unmatch data type.');
        }
    }
    if(JSON.stringify(result) === '[]'){
        result = undefined;
    }
    return result;
}

export const validate = (name, o) => {
    const obj;
    if(typeof o === 'object'){
        obj = o;
    }else if(typeof o === 'string'){
        try{
            obj = JSON.parse(o);
        }catch(e){
            console.error(e);
            return false;
        }
    }else{
        console.error('Incorrect data type.');
        return false;
    }
    if(!resp[name]){
        console.error('Incorrect api name.');
        return false;
    }
    try{
        return check(resp[name], obj);
    }catch(e){
        console.error(e);
        return false;
    }
}