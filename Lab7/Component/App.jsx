import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import PostsHolder from '/Component/PostHolder';
import AddPost from "./AddPost";

export default class App extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        //return <h1>Hello to React</h1>
        /*
        if <PostsHolder/> is added after line 19: After adding it will not update
        requires going back to home
        if <PostsHolder/> is added to AddPost render() then it works as expected?
         */
        let postHolder = new PostsHolder();
        return <Router>
            <Switch>
                <Route exact path="/add">
                    <AddPost save={postHolder.addNewPost}/>
                </Route>
                <Route exact path="/">
                    <PostsHolder/>
                </Route>
            </Switch>
            <pre style={{"fontSize":16}}>
            <Link to="/add">Add</Link> <Link to="/">Home</Link>
            </pre>
        </Router>
    }
}

