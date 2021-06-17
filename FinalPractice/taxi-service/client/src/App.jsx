import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Categories from "./components/Categories";
import AddVehicle from "./components/AddVehicle";
import AddCategory from "./components/AddCategory";
import Vehicles from "./components/Vehicles";
import VehicleOfCategory from "./components/VehicleOfCategory";
export default () =>{
    return <Router>
        <Switch>
            <Route exact path="/view-categories">
                <Categories/>
            </Route>
            <Route exact path="/view-vehicles">
                <Vehicles/>
            </Route>
            <Route exact path="/add-vehicle">
                <AddVehicle/>
            </Route>
            <Route exact path="/add-category">
                <AddCategory/>
            </Route>
            <Route exact path="/vehicle-category">
                <VehicleOfCategory/>
            </Route>
        </Switch>
    </Router>
}