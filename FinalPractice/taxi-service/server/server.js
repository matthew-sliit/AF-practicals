const Koa = require('koa');
//allow cross origin resource sharing
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
//routers
const Router = require('./routes/category.router').Router;
//setup server
const server = new Koa();
//attach to server
server.use(cors('Access-Control-Allow-Origin'));
server.use(bodyparser())
    .use(Router.routes()).use(Router.allowedMethods())
    .use(context=>{context.body="Access Denied";});
server.listen(3000);
//console.log("Application is running on port "+3000);
console.log("Backend http://localhost:"+3000);