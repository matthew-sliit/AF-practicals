import React from "react";
//method to get json data from server
export default async function addToServer(url, data){
    let server_response = null;
    await fetch(url,{
        method: 'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
    }).then(response => response.text())
        .then(data => (server_response = data))
        .catch(error => console.log(error));
    return server_response;
}