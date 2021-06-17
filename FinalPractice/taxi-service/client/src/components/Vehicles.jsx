import React from "react";
import VehicleListItem from "./VehicleListItem";
import "../assets/scss/vehicle-table.scss";
export default class Vehicles extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            vehiclesArray:[]
        }
        this.getVehiclesFromDb=this.getVehiclesFromDb.bind(this);
    }
    componentDidMount() {
        this.getVehiclesFromDb();
    }
    async getVehiclesFromDb(){
        await fetch("http://localhost:3000/category/vehicle",{
            method:'get'
        }).then(response => response.text())
            .then(data => this.setState({vehiclesArray:JSON.parse(data)}))
            .catch(error => console.log(error));
    }
    render() {
        const vehiclesArray = this.state.vehiclesArray;
        console.log(JSON.stringify(vehiclesArray));
        if(vehiclesArray.length===0)
            return <p>No Vehicles Added yet!</p>
        return <table className={"vehicle-table"}>
            <thead>
            <tr key={0}><th>Code</th><th>Model</th><th>Type</th><th>Name</th><th>Categories</th></tr>
            </thead>
            <tbody>
              {vehiclesArray.map(vehicle => {return <VehicleListItem vehicle={vehicle}/>})}
            </tbody>
        </table>;
    }
}