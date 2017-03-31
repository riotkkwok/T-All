const koa = require('koa2');
const bodyparser = require('koa-bodyparser');
const co = require('co');
const handlers = {
    queryUserInfo: require('../handlers/queryUserInfo.js'),
    queryDateInfo: require('../handlers/queryDateInfo.js'),
    queryAssigneeList: require('../handlers/queryAssigneeList.js'),
    queryTaskList: require('../handlers/queryTaskList.js'),
    
    login: require('../handlers/login.js'),
    logout: require('../handlers/logout.js'),

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
    const param = ctx.request.body;
    console.log(name);
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
        }finally{
            ctx.body = JSON.stringify(body);
        }
    }else{
        ctx.body = 'Koa 2 : 404 - Not Found';
    }
}));

app.listen(3000);
console.log('started');
