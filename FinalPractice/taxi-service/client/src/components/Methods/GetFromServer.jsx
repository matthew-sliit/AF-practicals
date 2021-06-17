import React from "react";

export default async function getFromServer(url){
    let server_response;
    await fetch(url,{
        method: 'get',
        headers: {'Accept': 'application/json'}
    }).then(response => response.text())
        .then(data => (server_response = data))
        .catch(error => console.log(error));
    return server_response;
}