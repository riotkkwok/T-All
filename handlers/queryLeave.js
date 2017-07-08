const assigneeModel = require('../services/connectDB.js').assignee;

const handler = function(param){
    console.log('queryLeave handler');
    return function(cb){
        const pr = assigneeModel.
            find({id: param.id}).
            select('-_id leaves').
            exec();
        pr.then(function(rs){
            console.log(rs);
            let resp = {};
            if(rs.length === 1){
                resp = rs[0].leaves;
            }
            cb(null, resp);
        });
    }
}

module.exports = handler;