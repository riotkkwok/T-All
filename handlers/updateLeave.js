const assigneeModel = require('../services/connectDB.js').assignee;

const handler = function(param){
    console.log('updateLeave handler');
    return function(cb){
        const pr = assigneeModel.
            find({id: param.id}).
            select('-_id leaves').
            exec();
        pr.then(function(rs){
            const leaves = rs[0].leaves || {};
            leaves[param.date] = {
                type: param.type,
                time: param.time
            };
            const pr2 = assigneeModel.
                update({id: param.id}, {$set: {leaves}}).
                exec();
            pr2.then(function(rs){
                console.log(rs);
                const resp = {};
                if(rs && rs.nModified === 1 && rs.ok === 1){
                    resp.result = 0;
                    cb(null, resp);
                }else{
                    resp.result = -1;
                    cb({
                        msg: 'failed to update leave.',
                        errCode: resp.result
                    }, {});
                }
            });
        });
    }
}

module.exports = handler;