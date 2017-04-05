const taskModel = require('../services/connectDB.js').task;
const colorModel = require('../services/connectDB.js').color;

const handler = function(param){
    console.log('addTask handler');
    // TODO - validate user


    calcDuration(param);

    return function(cb){
        const resp = {};
        let pCount = 0;
        function process(param){
            if(pCount !== 2){
                return;
            }
            const prAll = taskModel.
                create(param);
            prAll.then(function(rs){
                if(rs.id === param.id && rs.color === param.color){
                    resp.result = 0;
                    cb(null, resp);
                }else{
                    resp.result = -2;
                    cb({
                        msg: 'failed to add task.',
                        errCode: resp.result
                    }, {});
                }
            })
        }

        const pr = taskModel.
            find().
            sort({id: 'desc'}).
            select('-_id id').
            limit(1).
            exec();
        pr.then(function(rs){
            if(rs.length > 0){
                param.id = rs[0].id;
            }else{
                param.id = '0';
            }
            pCount++;
            process(param);
        });
        const pr2 = colorModel.
            find().
            sort({vacantFrom: 'asc', color: 'asc'}).
            limit(1).
            update({color: param.color}, {$set: {vacantFrom: param.endDate}}).
            exec();
        pr2.then(function(rs){
            console.log(rs);
            if(rs && rs.nModified === 1 && rs.ok === 1){
                pCount++;
                process(param);
            }else{
                resp.result = -1;
                cb({
                    msg: 'failed to mark color.',
                    errCode: resp.result
                }, {});
            }
        });
    }
}

function calcDuration(task){
    let start, end, dateLs = [];
    for(let i=0; i<task.asg.length; i++){
        dateLs = dateLs.concat(task.asg[i].effort.dev || [], task.asg[i].effort.intg || [], task.asg[i].effort.test || [], task.asg[i].effort.rls || []).sort()
    }
    dateLs.sort();
    console.log(dateLs);
    task.startDate = dateLs[0];
    task.endDate = dateLs.pop();
}

module.exports = handler;