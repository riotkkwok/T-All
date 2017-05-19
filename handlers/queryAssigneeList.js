const assigneeModel = require('../services/connectDB.js').assignee;

const handler = function(){
    console.log('queryAssigneeList handler');
    return function(cb){
        const pr = assigneeModel.
            find().
            sort({id: 'asc'}).
            select('-_id id name leaves').
            exec();
        pr.then(function(rs){
            let resp;
            if(rs.length > 0){
                resp = rs;
            }else{
                console.log('queryAssigneeList - no record');
                resp = [];
            }
            cb(null, resp);
        });
    }
}

module.exports = handler;