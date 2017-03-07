const handler = function(){
    console.log('preAddTask handler');
    return function(cb){
        /* mock response [start] */
        const resp = {
            "code": 0,
            "data": {
                "id": "3",
                "color": "#6666ff"
            }
        };
        /* mock response [end] */
        cb(null, JSON.stringify(resp));
    }
}

module.exports = handler;