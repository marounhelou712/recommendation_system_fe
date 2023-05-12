import React from "react";


export async function handleLOGIN(user, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
        body: JSON.stringify({
            "username": user,
            "password": password
          })
    };
    try{
    fetch('http://localhost:8080/api/authenticate', requestOptions)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('access_token', data.id_token)
    }
    );
    } catch(err) {
        console.log(err);
    }
}


export async function PostInterraction(
    accessToken,
    product_id, 
    product_name, 
    product_category, 
    product_brand,
    product_created_for,
    price,
    product_description,
    product_color,
    user_id,
    user_gender,
    event_type,
    event_id
    ) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
            product_id: product_id,
            product_name: product_name,
            product_category: product_category,
            product_brand: product_brand,
            product_created_for: product_created_for,
            price: price,
            product_description: product_description,
            product_color: product_color,
            user_id: user_id,
            user_gender: user_gender,
            event_type: event_type,
            event_id: event_id
        })
    }

    fetch("http://localhost:8080/api/interactionData", requestOptions)
}