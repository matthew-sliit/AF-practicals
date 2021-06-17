import React from "react";
import addToServer from "./Methods/AddToServer";
export default class AddCategory extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            server_msg:null
        }
        this.addCategory=this.addCategory.bind(this);
    }
    async addCategory(){
        const catergoryName = this.name.value;
        if(catergoryName.length===0) {
            this.setState({server_msg: "Category name cannot be empty!"})
            return false;
        }
        let response = await addToServer("http://localhost:3000/category/add",{"name":catergoryName});
        this.setState({server_msg: response});
        if(response==="success"){
            window.location.href="/view-categories";
        }
        /*
        await fetch("http://localhost:3000/category/add",{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({"name":catergoryName})
        }).then(response=>response.text())
            .then(data=>this.setState({server_msg:data}))
            .catch(error => console.log(error));
         */
    }
    render() {
        const server_msg = this.state.server_msg;
        let errorMSg = "";
        if(server_msg !== null)
            if(server_msg !== "success") {
                errorMSg = server_msg;
            }
        return <React.Fragment>
            <p>{errorMSg}</p>
            <pre>
            <lable>Enter Category name:</lable>
            <input type={"text"} ref={(ref) => {this.name = ref}}/> <button onClick={this.addCategory.bind(this)}>Save</button></pre>
        </React.Fragment>;
    }
}