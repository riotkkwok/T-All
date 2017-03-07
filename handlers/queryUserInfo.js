const handler = function(){
    console.log('queryUserInfo handler');
    return function(cb){
        /* mock response [start] */
        const resp = {
            "code": 0,
            "data": {
                "userId": "001",
                "userName": "陈大文",
                "adminId": "A1"
            }
        };
        /* mock response [end] */
        cb(null, JSON.stringify(resp));
    }
}

module.exports = handler;