const handler = function(){
    console.log('updateLeave handler');
    return function(cb){
        /* mock response [start] */
        const resp = {};
        /* mock response [end] */
        cb(null, JSON.stringify(resp));
    }
}

module.exports = handler;