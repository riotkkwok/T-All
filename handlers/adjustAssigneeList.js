const handler = function(){
    console.log('adjustAssigneeList handler');
    return function(cb){
        /* mock response [start] */
        const resp = {};
        /* mock response [end] */
        cb(null, JSON.stringify(resp));
    }
}

module.exports = handler;