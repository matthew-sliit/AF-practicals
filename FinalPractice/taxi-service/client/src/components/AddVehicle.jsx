import React from "react";
import  "../assets/scss/vehicle-form.scss";
export default class AddVehicle extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            categoriesArray:[],
            server_msg:null
        }
        this.addVehicle=this.addVehicle.bind(this);
        this.formatVehicleDetailsIntoBody=this.formatVehicleDetailsIntoBody.bind(this);
        this.getCategoriesFromDB = this.getCategoriesFromDB.bind(this);
    }
    componentDidMount() {
        this.getCategoriesFromDB();
    }
    async getCategoriesFromDB(){
        await fetch("http://localhost:3000/category/type/default",{
            method: 'get',
            headers: {'Accept': 'application/json'}
        }).then(response => response.text())
            .then(data => this.setState({categoriesArray:JSON.parse(data)}))
            .catch(error => console.log(error));
    }
    async addVehicle(){
        await fetch("http://localhost:3000/category/vehicle",{
           method:'post',
           headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.formatVehicleDetailsIntoBody())
        }).then(response => response.text())
            .then(data => this.setState({server_msg:data}))
            .catch(error => console.log(error));
        const server_msg = this.state.server_msg;
        if(server_msg==="success")
            window.location.href = "/";
    }
    formatVehicleDetailsIntoBody(){
        let i, categories = [];
        const catArray = this.state.categoriesArray;
        for(i=0;i<catArray.length;i++){
            let value = 0;
            let elementInRef = document.getElementById("c"+i);
            if(typeof elementInRef !== undefined)
                if(elementInRef.checked === true)
                    categories.push(catArray[i]);
        }
        return {"code":this.code.value,"model":this.model.value,"type":this.type.value,"name":this.name.value,"categories":categories};
    }
    render() {
        const server_msg = this.state.server_msg;
        let errorMsg = "";
        if(server_msg !== null)
            if(server_msg !== "success"){
                errorMsg = server_msg;
            }
        let showCategories = [];
        const categories = this.state.categoriesArray;
            if(categories.length>0){
                let i;
                for(i=0;i<categories.length;i++){
                    showCategories.push(<label>{categories[i].name}</label>);
                    showCategories.push(<input type="checkbox" id={"c"+i} value={categories[i].name}/>);
                    showCategories.push(<br/>);
                }
            }
        return <React.Fragment>
            <p>{errorMsg}</p>
        <table className={"vehicle-form"}>
            <thead><tr><th></th><th></th></tr></thead>
            <tbody>
            <tr>
                <td>Enter Code</td>
                <td><input type={"text"} ref={(ref) => {this.code = ref}} placeholder={"Enter registration code"}/></td>
            </tr>
            <tr>
                <td>Enter Model</td>
                <td><input type={"text"} ref={(ref) => {this.model = ref}} placeholder={"Enter vehicle model"}/></td>
            </tr>
            <tr>
                <td>Enter Type</td>
                <td><input type={"text"} ref={(ref) => {this.type = ref}} placeholder={"Enter vehicle type"}/></td>
            </tr>
            <tr>
                <td>Enter Name</td>
                <td><input type={"text"} ref={(ref) => {this.name = ref}} placeholder={"Enter vehicle name"}/></td>
            </tr>
            <tr>
                <td>Vehicle Categories:</td>
                <td>
                    {showCategories}
                </td>
            </tr>
            </tbody>
        </table>
            <p/>
            <button onClick={this.addVehicle.bind(this)}>Save</button>
        </React.Fragment>;
    }
}