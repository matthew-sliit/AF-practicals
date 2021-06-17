import React from "react";
import Posts from "/Component/Posts";
import AddPost from "./AddPost";

//const changed to var which can be accessed globally
//otherwise push method has no effect
var posts=[
    {
        id:1,name:'React',description:'Best UI Library'
    },{
        id:2,name:'Node',description: 'Server side JS'
    }
];

export default class PostHolder extends React.Component{
    constructor(props) {
        super(props);
        this.addNewPost=this.addNewPost.bind(this);
    }
    componentDidMount() {
        this.addNewPost=this.addNewPost.bind(this);
    }

    render() {
        console.log("renders >"+JSON.stringify(posts)+"< end render");
        //return <h1>Hello to React</h1>
        return <Posts posts={posts}/>;

    }
    addNewPost({name,description}){
        //console.log("Before Pushing: "+JSON.stringify(posts));
        posts.push({id:posts.length+1,name,description});
        //console.log("After Pushing: "+JSON.stringify(posts));
    }
}