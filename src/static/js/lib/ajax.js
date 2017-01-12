export const ajax = (options) => {
    let xhr = new XMLHttpRequest();
    const opt = {
            type: options.type || 'GET',
            url: options.url || '',
            async: options.async === false ? false : true,
            username: options.username || null,
            password: options.password || null,
            data: toParamString(options.data),
            dataType: options.dataType || ''
        },
        sucFn = options.success,
        errFn = options.error,
        doneFn = options.finish;

    xhr.responseType = opt.dataType;
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
            if(xhr.responseType === '' || xhr.responseType === 'text'){
                try{
                    resp = JSON.parse(xhr.response);
                }catch(e){
                    resp = {
                        raw: xhr.responseText || xhr.response
                    };
                }
            }else if(xhr.responseType === 'json'){
                resp = xhr.response;
            }else if(xhr.responseType === 'document'){
                try{
                    resp = (new DOMParser()).parseFromString(xhr.response, "text/xml");
                }catch(e){
                    resp = {
                        raw: xhr.responseXML || xhr.response
                    };
                }
            }else{
                // 暂不支持arraybuffer和blob
                resp = {};
            }
            if(xhr.status === 200){
                sucFn(resp, xhr);
            }else{
                errFn(xhr);
            }
            doneFn(xhr);
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