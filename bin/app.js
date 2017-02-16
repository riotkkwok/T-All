const koa = require('koa2');
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

app.use(co.wrap(function *(ctx, next) {
    const start = new Date();
    yield next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}));

// handlers
app.use(co.wrap(function *(ctx, next) {
    const name = ctx.url.replace('/', '').split('?')[0];
    const param = ctx.query;
    console.log(name);
    console.log(param);
    if(handlers.hasOwnProperty(name)){
        ctx.body = yield handlers[name].apply(this, param);
        ctx.response.type = 'text/plain';
    }else{
        ctx.body = 'Koa 2 : 404 - Not Found';
    }
}));

app.listen(3000);
console.log('started');
