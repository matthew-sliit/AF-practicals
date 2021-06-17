import React from "react";
import VehicleListItem from "./VehicleListItem";
import * as ReactDOM from "react-dom";
import "../assets/scss/vehicle-table.scss";
export default class VehicleOfCategory extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            vehiclesArray:[],
            categoriesArray:[]
        }
        this.getVehiclesFromDb=this.getVehiclesFromDb.bind(this);
        this.getCategoriesFromDB=this.getCategoriesFromDB.bind(this);
        this.getVehiclesAsList=this.getVehiclesAsList.bind(this);
    }
    componentDidMount() {
        this.getCategoriesFromDB();
        this.getVehiclesFromDb();
    }
    async getVehiclesFromDb(){
        await fetch("http://localhost:3000/category/vehicle",{
            method:'get'
        }).then(response => response.text())
            .then(data => this.setState({vehiclesArray:JSON.parse(data)}))
            .catch(error => console.log(error));
    }
    async getCategoriesFromDB(){
        await fetch("http://localhost:3000/category/type/default",{
            method: 'get',
            headers: {'Accept': 'application/json'}
        }).then(response => response.text())
            .then(data => this.setState({categoriesArray:JSON.parse(data)}))
            .catch(error => console.log(error));
    }
    getVehiclesAsList(){
        const havingCategory = this.selection.value;
        const vehiclesArray = this.state.vehiclesArray;
        let i, catIndex, content=[];
        for(i=0;i<vehiclesArray.length;i++){
            for(catIndex = 0;catIndex<vehiclesArray[i].categories.length;catIndex++){
                console.log("saved->"+vehiclesArray[i].categories[catIndex].name);
                console.log("has=>"+havingCategory);
                if(vehiclesArray[i].categories[catIndex].name===havingCategory){
                    content.push(vehiclesArray[i]);
                    catIndex = vehiclesArray[i].categories.length;
                }
            }
        }
        let vehiclesTable = '';
        if(content.length>0){
            vehiclesTable = <table className={"vehicle-table"}>
                <thead><tr key={0}><th>Code</th><th>Model</th><th>Type</th><th>Name</th><th>Categories</th></tr></thead>
                <tbody>
                {content.map(vehicle => {return <VehicleListItem key={0} vehicle={vehicle}/>})}
                </tbody>
            </table>
        }
        ReactDOM.render(vehiclesTable,document.getElementById("resultVehicles"));
    }
    render() {
        const categoriesArray = this.state.categoriesArray;
        if(categoriesArray.length===0)
            return <p>Add a new Category and a new Vehicle to show here</p>
        return <React.Fragment>
            <select onClick={this.getVehiclesAsList.bind(this)} ref={(ref) => {this.selection = ref}}>
                <option>Select Category</option>
                {categoriesArray.map(category => {
                    //for each vehicle in array
                    return <option>{category.name}</option>
                })}
            </select>
            <p/>
            <div id={"resultVehicles"}></div>
        </React.Fragment> ;
    }
}