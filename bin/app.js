const koa = require('koa2');
const co = require('co');

const app = new koa();

app.use(co.wrap(function *(ctx, next) {
    const start = new Date();
    yield next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}));

// response
app.use(ctx => {
    ctx.body = 'Hello Koa  in app-generator.js';
});

app.listen(3000);
