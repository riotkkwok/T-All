const taskModel = require('../services/connectDB.js').task;

const handler = function(){
    console.log('queryTaskList handler');
    return function(cb){
        const pr = taskModel.
            find({}, {
                _id: false,
                __v: false,
                'asg._id': false
            }).
            sort({id: 'asc'}).
            exec();
        pr.then(function(rs){
            let resp;
            if(rs.length > 0){
                resp = rs;
            }else{
                console.log('queryTaskList - no record');
                resp = [];
            }
            cb(null, resp);
        });
    }
}

module.exports = handler;