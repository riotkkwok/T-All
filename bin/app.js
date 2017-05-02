const koa = require('koa2');
const bodyparser = require('koa-bodyparser');
const co = require('co');
const handlers = {
    queryUserInfo: require('../handlers/queryUserInfo.js'),
    queryDateInfo: require('../handlers/queryDateInfo.js'),
    queryAssigneeList: require('../handlers/queryAssigneeList.js'),
    queryTaskList: require('../handlers/queryTaskList.js'),
    
    login: require('../handlers/login.js'),
    logout: require('../handlers/logout.js')
};
const handlersWithAuth = {
    preAddTask: require('../handlers/preAddTask.js'),
    addTask: require('../handlers/addTask.js'),
    updateTask: require('../handlers/updateTask.js'),
    deleteTask: require('../handlers/deleteTask.js'),

    addLeave: require('../handlers/addLeave.js'),
    updateLeave: require('../handlers/updateLeave.js'),
    deleteLeave: require('../handlers/deleteLeave.js'),
    
    adjustAssigneeList: require('../handlers/adjustAssigneeList.js')
};

const app = new koa();

app.keys = ['t-all secret 2017'];

app.use(co.wrap(function *(ctx, next) {
    const start = new Date();
    yield next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}));

app.use(bodyparser());

// handlers
app.use(co.wrap(function *(ctx, next) {
    const name = ctx.url.replace('/', '').split('?')[0];
    const param = ctx.method === 'POST' ? ctx.request.body : 
        (!!ctx.query.reqBody ? JSON.parse(decodeURIComponent(ctx.query.reqBody)) : ctx.query);
    console.log('name: '+name);
    console.log(param);
    if(handlers.hasOwnProperty(name)){
        ctx.response.type = 'application/json';
        const body = {
            "code": 0,
            "data": {}
        }
        try{
            const data = yield handlers[name].call(ctx, param);
            body.code = 0;
            body.data = data;
        }catch(e){
            console.log(e);
            body.code = -1;
        }finally{
            ctx.body = JSON.stringify(body);
        }
    }else if(handlersWithAuth.hasOwnProperty(name)){
        console.log('Authenticating...');
        ctx.response.type = 'application/json';
        const body = {
            "code": 0,
            "data": {}
        }

        try{
            const result = yield handlers.queryUserInfo.call(ctx, param);
            if(!result.userName || !result.userId || !result.adminId || result.adminId !== 'A1'){
                body.code = -101;
                ctx.body = JSON.stringify(body);
                return;
            }
        }catch(e){
            console.log(e);
            body.code = -100;
            ctx.body = JSON.stringify(body);
            return;
        }

        try{
            const data = yield handlersWithAuth[name].call(ctx, param);
            body.code = 0;
            body.data = data;
        }catch(e){
            console.log(e);
        }finally{
            ctx.body = JSON.stringify(body);
        }
    }else{
        ctx.body = 'T-All : 404 - Not Found';
    }
}));

app.listen(3000);
console.log('started');
