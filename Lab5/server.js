/*
====== Labsheet 5 Answers =======
*/
const Koa = require('koa');

const app = new Koa();
/*app.use(ctx =>{
    ctx.body="Hello World";
});
app.listen(3000);
console.log("Application is running on port 3000");
*/
const bodyParser = require('koa-bodyparser');
//import router object from 'routes/home.router.js'
const HomeRoutes = require('./routes/home.router.js').HomeRouter;
//import post router api
const PostRoutes = require('./routes/post.routes.js').PostRouter;

app.use(bodyParser())//bodyParser() is a function
.use(HomeRoutes.routes()).use(HomeRoutes.allowedMethods())//should run before listening to port and setting body as in step 4
.use(PostRoutes.routes()).use(PostRoutes.allowedMethods())
.use(ctx =>{
    ctx.body="Hello from Server";
})//then after step 4
.listen(3000);
console.log("Application is running on port 3000");