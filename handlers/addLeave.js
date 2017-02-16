const handler = function(){
    console.log('addLeave handler');
    return function(cb){
        cb(null, '');
    }
}

module.exports = handler;