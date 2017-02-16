const handler = function(){
    console.log('addTask handler');
    return function(cb){
        cb(null, '');
    }
}

module.exports = handler;