const crypto = require('crypto');

const userModel = require('../services/connectDB.js').user;

const handler = function(){
    console.log('logout handler');
    const that = this;
    return function(cb){
        const ticket = that.cookies.get('NSESSIONID'),
            userId = that.cookies.get('uid');

        if(!userId || !ticket){
            cb({
                msg: 'invalid request parameters.'
            }, {});
        }

        const pr = userModel.
            update({userId: userId, ticket: ticket}, {$set: {ticket: '', ticketValid: 0}}).
            exec();
        pr.then(function(rs){
            console.log(rs);
            const resp = {};
            if(rs && rs.nModified === 1 && rs.ok === 1){
                resp.result = 0;
                that.cookies.set('NSESSIONID', ticket, {expires: new Date(0)});
                cb(null, resp);
            }else{
                resp.result = -1;
                cb({
                    msg: 'failed to logout.',
                    errCode: resp.result
                }, {});
            }
        });
    }
}

module.exports = handler;