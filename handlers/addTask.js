const handler = function(){
    console.log('addTask handler');
    return function(cb){
        /* mock response [start] */
        const resp = {
            "code": 0,
            "data": {
                "result": 0
            }
        }
        /* mock response [end] */
        cb(null, JSON.stringify(resp));
    }
}

module.exports = handler;