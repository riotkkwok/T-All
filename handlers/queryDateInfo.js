const taskModel = require('../services/connectDB.js').task;

const handler = function(){
    console.log('queryDateInfo handler');
    const now = new Date();
    return function(cb){
        const resp = {
            "startDate": "",
            "nowDate": dateString(now),
            "endDate": ""
        };
        const pr = taskModel.
            find().
            sort({startDate: 'asc', endDate: 'asc'}).
            exec();
        pr.then(function(rs){
            if(rs.length > 0){
                resp.startDate = rs[0].startDate;
                resp.endDate = rs[rs.length - 1].endDate.split('/')[0]+'/12/31';
            }else{
                console.log('queryDateInfo - no record');
                resp.startDate = now.getFullYear()+'/1/1';
                resp.endDate = now.getFullYear()+'/12/31';
            }
            cb(null, resp);
        });
    }
}

function dateString(d){
    return (d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()).replace(/\b([0-9]{1})\b/g, '0$1')
}

module.exports = handler;