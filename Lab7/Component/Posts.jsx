import React from "react";
import PostListItem from "./PostListItem";
import Post from "./Post";
export default class Posts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            post:null
        };
    }
    selectPost(post){
        this.setState({post: post});
    }
    render() {
        const {posts} = this.props;
        return <div>
            <h1>From Posts Component</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Select</th>
                </tr>
                </thead>
                <tbody>
                {posts.map(post => {
                    return <PostListItem
                        // Lab sheet correction from recording
                        key={post.id.toString()} post={post} selectPost={post=>this.selectPost(post)}/>
                })}
                </tbody>
            </table>
            <h1>From Post Component after selecting</h1>
            <div>
                {this.state.post ? <Post post={this.state.post}
                                         editable={false}/> : ''}
            </div>
        </div>;
    }
}