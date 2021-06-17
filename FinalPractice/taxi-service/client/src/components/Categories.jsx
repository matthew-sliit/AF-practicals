import React from 'react';
import getFromServer from "./Methods/GetFromServer";
export default class Categories extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            categoriesArray:[]
        }
        this.getCategoriesFromDB = this.getCategoriesFromDB.bind(this);
    }
    componentDidMount() {
        this.getCategoriesFromDB();
    }
    async getCategoriesFromDB(){
        /*
        await fetch("http://localhost:3000/category/type/default",{
            method: 'get',
            headers: {'Accept': 'application/json'}
        }).then(response => response.text())
            .then(data => this.setState({categoriesArray:JSON.parse(data)}))
            .catch(error => console.log(error));
         */
        let categories = await getFromServer("http://localhost:3000/category/type/default");
        await this.setState({categoriesArray:JSON.parse(categories)});
    }
    render() {
        const categories = this.state.categoriesArray;
        if(typeof categories === undefined)
            return <p>No categories</p>
        else if(categories.length===0)
            return <p>No Categories Added Yet!</p>
        let i, content=[];
        for(i=0;i<categories.length;i++){
            content.push(<li>{categories[i].name}</li>);
        }
        return <ol>{content}</ol>;
    }
}