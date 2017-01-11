export const ajax = (options) => {
    let xhr = new XMLHttpRequest();
    const opt = {
            type: options.type || 'GET',
            url: options.url || '',
            async: options.async || true,
            username: options.username || null,
            password: options.password || null,
            data: toParamString(options.data)
        },
        sucFn = options.success,
        errFn = options.error,
        doneFn = options.finish;

    xhr.timeout = parseInt(options.timeout, 10) || 5000;
    if(opt.type.toUpperCase() !== 'POST' && !!opt.data){
        if(opt.url.indexOf('?') >= 0){
            opt.url += '&' + opt.data;
        }else{
            opt.url += '?' + opt.data;
        }
    }
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            let resp;
            if(xhr.responseXML){
                resp = {};
            }else if(xhr.responseText){
                try{
                    resp = JSON.parse(xhr.responseText);
                }catch(e){
                    resp = xhr.responseText;
                }
            }else{
                resp = {};
            }
            if(xhr.status === 200){
                if(typeof sucFn === 'function'){
                    sucFn(resp, xhr);
                }
            }else{
                if(typeof errFn === 'function'){
                    errFn(xhr);
                }
            }
            if(typeof doneFn === 'function'){
                doneFn(xhr);
            }
        }
    };

    if(!!opt.username && !!opt.password){
        xhr.open(opt.type, opt.url, opt.async, opt.username, opt.password);
    }else{
        xhr.open(opt.type, opt.url, opt.async);
    }
    xhr.send(opt.data);
}

function toParamString(obj){
    let str = '';
    if(!obj){
        return '';
    }
    for(let key in obj){
        if(str.length > 0){
            str += '&';
        }
        str += (encodeURIComponent(key)+'='+encodeURIComponent(obj[key]));
    }
    return str;
}