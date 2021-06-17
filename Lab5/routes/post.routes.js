const Router = require('@koa/router');
const createPost = require('../api/post.api.js').createPost;
const getPosts = require('../api/post.api.js').getPosts;
const getPostsById = require('../api/post.api.js').getPostsById;

const router = new Router({prefix:'/posts'});

router.get('/',ctx=>{
    //console.log("post.routes::GET");
    ctx.body = getPosts();
});

router.post('/',ctx=>{
    //console.log("post.routes::POST");
    let post = ctx.request.body;
    post = createPost(post);
    ctx.response.status = 201;
    ctx.body = post;
});

router.get('/:id',ctx=>{
    const id = ctx.params.id;
    //console.log('post.routes::GET{'+id+'}');
    ctx.body = getPostsById(id);
});

exports.PostRouter = router;