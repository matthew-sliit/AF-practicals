//import Router from "@koa/router";
const Router = require('@koa/router');
const router = new Router({
    prefix:'/home'
});

router.get('/',ctx=>{
    ctx.body="Got from Home Router";
});

router.post('/',ctx=>{
    ctx.body="Posted From Home Router";
})
//export router as HomeRoutes
exports.HomeRouter=router;