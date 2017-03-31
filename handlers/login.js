const crypto = require('crypto');

const userModel = require('../services/connectDB.js').user;

const handler = function(param){
    console.log('login handler');
    const that = this;
    const sha1 = crypto.createHash('sha1');
    sha1.update(param.userId);
    sha1.update(param.password);
    const pwd = sha1.digest('hex');

    return function(cb){
        function process(param){
            const date = Date.now(), dateValid = date + 24*60*60*1000; // 登陆有效期为一天
            const sha1 = crypto.createHash('sha1');
            sha1.update(param.userId);
            sha1.update(param.password);
            sha1.update(''+date);
            sha1.update('t-all secret 2017');
            const ticket = sha1.digest('hex');
            const pr = userModel.
                update({ userId: param.userId, password: pwd},
                    { ticket: ticket, ticketValid: dateValid}).
                limit(1).
                exec();
            pr.then(function(rs){
                if(rs && rs.nModified === 1 && rs.ok === 1){
                    resp.result = 0;
                    that.cookies.set('NSESSIONID', ticket);
                    cb(null, resp);
                }else{
                    if(!rs){
                        resp.result = -2;
                    }else if(rs.nModified !== 1){
                        resp.result = -3;
                    }else if(rs.ok !== 1){
                        resp.result = -4;
                    }else{
                        resp.result = -5;
                    }
                    cb({
                        msg: 'failed to generate cookie.',
                        errCode: resp.result
                    }, {});
                }
            });
        }

        const resp = {};
        const sha1 = crypto.createHash('sha1');
        sha1.update(param.userId);
        sha1.update(param.password);
        const pwd = sha1.digest('hex');
        const pr = userModel.
            find({ userId: param.userId, password: pwd}).
            select('-_id userId userName adminId').
            limit(1).
            exec();
        pr.then(function(rs){
            if(rs.length > 0){
                resp.userId = rs[0].userId;
                resp.userName = rs[0].userName;
                resp.adminId = rs[0].adminId;
                process(param);
            }else{
                resp.result = -1;
                cb(null, resp);
            }
        });
    }
}

module.exports = handler;