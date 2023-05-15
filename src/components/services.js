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


  const listOfCategoryPerGender = (category, gender) => {
    let res = [];
  
    for (const element of category){
      if (element.product_created_for === gender){
        res.push(element)
      }
    }
    return res;
  }
  
  const isCategoryForThisGender = (category, gender) => {
    for (const element of category){
      if (element.product_created_for === gender){
        return true;
      }
    }
  
    return false;
  }
  
  const showInDropDown = (category, gender, handleChange) => {
    return (
      isCategoryForThisGender(category, gender) &&
      <Link to="/products">
        <a
        onClick={(e) => {handleChange(listOfCategoryPerGender(category,gender));
           }}
        class="dropdown-item">
          {category[0].product_category}
        </a>
      </Link>
    );
  }
  
  export const showAllInDropDown = (gender, handleChange) => {
    return (
      <>
      {showInDropDown(all.listOfAllProducts_Backpack, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Bag, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Ballerinas, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Bangle, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Beanie, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Belt, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Blazer, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Blouse, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Boots, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Cardigan, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Cargos, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Chinos, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Churidar, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Dress, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_FlipFlop, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Heels, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Jacket, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Jeans, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Joggers, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Jumpsuit, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Legging, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Pant, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Playsuit, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Pumps, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Pyjamas, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Sandals, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Saree, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Scarf, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Shirt, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Shoes, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Shorts, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Shrug, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Skirt, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_SlipOn, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Slippers, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Sneakers, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Suit, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Sweater, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Top, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Treggings, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Trousers, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Tshirt, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Tunic, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Wallet, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Watch, gender, handleChange)}
      {showInDropDown(all.listOfAllProducts_Wedges, gender, handleChange)}
      </>
    )
  }
  
  
  export const DropDownPerGender = (gender, handleChange) => {
    return (
      <div class="nested dropdown">
          <a class="navbar-item">
            <span class="icon-text ">
              <span>{gender}</span>
              <span class="icon">
                <i class="fas fa-arrow-right"/>
              </span>
            </span>
          </a>
  
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
              {showAllInDropDown(gender, handleChange)}
          </div>
        </div>
      </div>
    )
  }