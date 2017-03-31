const crypto = require('crypto');

const userModel = require('../services/connectDB.js').user;

const handler = function(param){
    console.log('queryUserInfo handler');
    const now = Date.now();
    const that = this;
    return function(cb){
        const ticket = that.cookies.get('NSESSIONID');

        if(!param || !param.userId || !ticket){
            cb({
                msg: 'invalid request parameters.'
            }, {});
        }

        const pr = userModel.
            find({userId: param.userId, ticket: ticket}).
            where('ticketValid').gt(now).
            limit(1).
            exec();
        pr.then(function(rs){
            console.log('then');
            console.log(rs);
            const resp = {};
            if(rs.length === 1){
                console.log('got');
                resp.userName = rs[0].userName;
                resp.userId = rs[0].userId;
                resp.adminId = rs[0].adminId;
            }else{
                console.log('queryUserInfo - no record');
            }
            cb(null, resp);
        });
    }
}

module.exports = handler;