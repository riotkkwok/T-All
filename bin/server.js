const koa = require('koa2');
const app = new koa();

app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(3000);
