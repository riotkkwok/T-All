const handler = function(){
    console.log('queryDateInfo handler');
    return function(cb){
        /* mock response [start] */
        const resp = {
            "code": 0,
            "data": {
                "startDate": "2016/01/01",
                "nowDate": "2016/01/10",
                "endDate": "2016/3/31"
            }
        };
        /* mock response [end] */
        cb(null, JSON.stringify(resp));
    }
}

module.exports = handler;