import React from "react";
import {render} from "react-dom";
import * as ReactDOM from "react-dom";
import worker_script from "../components/WorkerThread/serviceWorker";
const serviceWorker = new Worker(worker_script);
class TripCalculation extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            vehiclesArray:[],
            vehicleInFocus:-2,
            price:4000
        }
        this.getVehiclesFromDb=this.getVehiclesFromDb.bind(this);
        this.getCategoriesFromDB=this.getCategoriesFromDB.bind(this);
        this.selectVehicleSetTripTypes=this.selectVehicleSetTripTypes.bind(this);
        this.setPrice = this.setPrice.bind(this);
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
    selectVehicleSetTripTypes(){
        const vehiclesArray = this.state.vehiclesArray;
        let i;
        for(i=0;i<vehiclesArray.length;i++){
            if(vehiclesArray[i].name === this.select_vehicle.value){
                this.setState({vehicleInFocus: i});
                i = vehiclesArray.length;
            }
        }
    }
    async setPrice(){
        const duration = this.duration.value;
        let price = 0;
        if(duration>0){
            serviceWorker.postMessage(duration);
            serviceWorker.onmessage = (e)=>{
                price = parseFloat(e.data);
                this.setState({price:price});
            }
        }
    }
    render() {
        const vehiclesArray = this.state.vehiclesArray;
        let vehicleInFocus = this.state.vehicleInFocus;
        const price = this.state.price;
        if(vehiclesArray.length>0)
            if(vehicleInFocus===-2)
                vehicleInFocus = 0;
        return <React.Fragment>
        <table>
            <thead>
            <tr><th></th></tr>
            </thead>
            <tbody>
            <tr>
                <td>Enter your name</td>
                <td><input type="text" ref={(ref) => {this.name = ref}} placeholder="Enter Your Name"/></td>
            </tr>
            <tr>
                <td><label>Enter pickup address</label></td>
                <td><input type="text" ref={(ref) => {this.pickup = ref}} placeholder="Enter Pickup location"/></td>
            </tr>
            <tr>
                <td>Enter your phone number</td>
                <td><input type="text" placeholder="Enter phone number"/></td>
            </tr>
            <tr>
                <td>Select Vehicle</td>
                <td>
                    <select ref={(ref) => {this.select_vehicle = ref}} onClick={this.selectVehicleSetTripTypes.bind(this)}>
                        {vehiclesArray.map(vehicle => {
                            //every vehicle
                            return <option>{vehicle.name}</option>
                        })}
                    </select>
                </td>
            </tr>
            <tr>
                <td>Trip type</td>
                <td>
                    <select ref={(ref) => {this.select_type = ref}}>
                        {vehicleInFocus>-1?vehiclesArray[vehicleInFocus].categories.map(category =>{
                            //for each category in selected vehicle
                            return <option>{category.name}</option>
                        }):''}
                    </select>
                </td>
            </tr>
            <tr>
                <td>Enter Travel Duration (hours)</td>
                <td><input type="number" ref={(ref) => {this.duration = ref}} min={0} defaultValue={1} onMouseLeave={this.setPrice.bind(this)} placeholder="Enter trip duration"/></td>
            </tr>
            </tbody>
        </table>
        <div id={"pricepay"}>
            <p>Payment amount: {price} Rs</p>
        </div>
        </React.Fragment>;
    }
}
//render routing content
render(<TripCalculation/>, document.getElementById('content'));