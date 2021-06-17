const uuid = require('uuid');
let posts = new Map();
exports.createPost = function createPost(obj){
    //obj has name, description
    //obj.prototype.id = uuid.v4();
    //obj.prototype.postedDate = new Date();
    var myobj = new Object(obj);
    myobj.id = uuid.v4();
    myobj.postedDate = new Date();
    posts.set(myobj.id,myobj);
}
exports.getPosts = function getPosts(){
    var array = [];
    for(let value of posts.values()){
        //console.log('api.getPosts:'+JSON.stringify(value));
        array.push(value);
    }
    return array;
}
exports.getPostsById = function getPostsById(id){
    for(let [key,value] of posts){
        if(key==id){
            //console.log('api.getPostsBtId:'+id+' &value:'+JSON.stringify(value));
            return value;
        }
    }
}