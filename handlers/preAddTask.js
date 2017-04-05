const colorModel = require('../services/connectDB.js').color;

const handler = function(){
    console.log('preAddTask handler');
    // TODO - validate user
    
    return function(cb){
        const resp = {};
        const pr = colorModel.
            find().
            sort({vacantFrom: 'asc', color: 'asc'}).
            select('-_id color').
            limit(1).
            exec();
        pr.then(function(rs){
            if(rs.length > 0){
                resp.color = rs[0].color;
            }else{
                console.log('preAddTask - no record');
            }
            cb(null, resp);
        });
    }
}

module.exports = handler;