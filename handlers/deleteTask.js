const taskModel = require('../services/connectDB.js').task;

const handler = function(param){
    console.log('deleteTask handler');
    // TODO - validate user

    return function(cb){
        const pr = taskModel.
            remove({ id: param.deleteId }).
            exec();
        pr.then(function(rs){
            const resp = {};
            if(rs.result && rs.result.n === 1 && rs.result.ok === 1){
                resp.result = 0;
            }else{
                console.log('deleteTask - no record deleted');
                resp.result = -1;
            }
            cb(null, resp);
        });
    }
}

module.exports = handler;