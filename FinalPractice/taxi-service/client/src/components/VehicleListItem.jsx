import React from "react";
export default function VehicleListItem(props){
    const {vehicle} = props;
    return <tr>
        <td>{vehicle.code}</td>
        <td>{vehicle.model}</td>
        <td>{vehicle.type}</td>
        <td>{vehicle.name}</td>
        <td>{vehicle.categories.map(category => {return <p>{category.name}</p>})}</td>
    </tr>;
}