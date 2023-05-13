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
        localStorage.setItem('access_token', data.id_token);
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
    console.log("ICILA");
    fetch("http://localhost:8080/api/interactionData", requestOptions);
}


export const colorToBackgroundColor = (color) => {
    switch (color) {
      case 'Beige':
        return "#F5F5DC";
  
      case 'Black':
        return "#000000";
  
      case 'Brown':
        return "#A52A2A";
  
      case 'Burgundy':
        return "#800020";
  
      case 'Charcoal':
        return "#36454F";
  
      case 'Gold':
        return "#FFD700";
  
      case 'Green':
        return "#008000";
  
      case 'Grey':
        return "#808080";
  
      case 'Khaki':
        return "#C3B091";
  
      case 'Lavender':
        return "#E6E6FA";
  
      case 'Magenta':
        return "#FF00FF";
  
      case 'Maroon':
        return "#800000";
  
      case 'Mustard':
        return "#FFDB58";
  
      case 'Navy':
        return "#000080";
  
      case 'Orange':
        return "#FFA500";
  
      case 'Pink':
        return "#FFC0CB";
  
      case 'Purple':
        return "#800080";
  
      case 'Red':
        return "#FF0000";
  
      case 'Rose':
        return "#FF007F";
  
      case 'Silver':
        return "#C0C0C0";
  
      case 'White':
        return "#FFFFFF";
  
      case 'Yellow':
        return "#FFFF00";
  
      case 'Blue':
        return "#0000FF";
  
      default:
        return "";
    }
  }