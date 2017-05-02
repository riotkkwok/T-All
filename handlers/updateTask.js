const taskModel = require('../services/connectDB.js').task;

const handler = function(param){
    console.log('updateTask handler');
    const tid = param.id;
    delete param.id;
    delete param.color;
    return function(cb){
        const pr = taskModel.
            update({ id: tid }, param).
            exec();
        pr.then(function(rs){
            const resp = {};
            if(rs && rs.nModified === 1 && rs.ok === 1){
                resp.result = 0;
                cb(null, resp);
            }else{
                resp.result = -1;
                cb({
                    msg: 'failed to update task.',
                    errCode: resp.result
                }, {});
            }
        });
    }
}

module.exports = handler;