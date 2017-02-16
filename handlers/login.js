const handler = function(){
    console.log('login handler');
    return function(cb){
        setTimeout(function(){
            /* mock response [start] */
            const resp = {
                "code": 0,
                "data": {
                    "result": 0
                }
            };
            /* mock response [end] */
            cb(null, JSON.stringify(resp));
        }, 2000);
    }
}

module.exports = handler;