import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import * as all from './listOfAllProducts'

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
        localStorage.setItem('user', data.userID);
        
    }
    );
    } catch(err) {
        console.log(err);
    }
}

export async function getBestSeller() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=utf-8', 
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
  }

  fetch('http:localhost:8080/api/bestSeller', requestOptions)
  .then(response => response.json)
  .then(data => {
    console.log(data)}
    )
};


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
    try{
    fetch("http://localhost:8080/api/interactionData", requestOptions);
    } catch (err){
      console.log(err)
    }
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


  export const filterByPrice = (minPrice, maxPrice, category) => {
    if (minPrice === "" || maxPrice === "" || minPrice === -1 || maxPrice === -1){
      return category
    }
    let res = []
    for (const element of category){
      if ((element.price >= minPrice) && (element.price <= maxPrice)){
        res.push(element);
      }
    }
    return res;
  }
  
  const showInDropDown = (category, handleChange) => {
    return (
      <Link to="/products">
        <a
        onClick={(e) => {handleChange(category); 
           }}
        class="dropdown-item">
          {category[0].product_category}
        </a> 
      </Link>
    );
  }
  
  export const showAllInDropDown = (handleChange) => {
    return (
      <>
      {showInDropDown(all.listBackpack, handleChange)}
      {showInDropDown(all.listBag, handleChange)}
      {showInDropDown(all.listBelt, handleChange)}
      {showInDropDown(all.listBlazer, handleChange)}
      {showInDropDown(all.listDress, handleChange)}
      {showInDropDown(all.listJacket, handleChange)}
      {showInDropDown(all.listJeans, handleChange)}
      {showInDropDown(all.listLegging, handleChange)}
      {showInDropDown(all.listPant, handleChange)}
      {showInDropDown(all.listPyjamas, handleChange)}
      {showInDropDown(all.listShirt, handleChange)}
      {showInDropDown(all.listShoes, handleChange)}
      {showInDropDown(all.listShorts, handleChange)}
      {showInDropDown(all.listSkirt, handleChange)}
      {showInDropDown(all.listSuit, handleChange)}
      {showInDropDown(all.listTop, handleChange)}
      {showInDropDown(all.listTshirt, handleChange)}
      {showInDropDown(all.listWallet, handleChange)}
      {showInDropDown(all.listWatch, handleChange)}
      </>
    )
  }
  
  
  export const DropDownPerGender = (handleChange) => {
    return (  
        <div class="dropdown" id="dropdown" role="menu">
          <div class="dropdown-content">
              {showAllInDropDown(handleChange)}
          </div>
        </div>
    )
  }