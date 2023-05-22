import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import * as all from './listOfAllProducts'
import { listOfAllProducts } from "./oneList";

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

export async function getBestSeller(setBestSeller) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=utf-8', 
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
  }

  fetch('http://localhost:8080/api/bestSeller', requestOptions)
  .then(response => response.json())
  .then(data => {
    setBestSeller(data)}
    )
};

export async function getCollaborativeFiltering(accessToken, setCollabFilter) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=utf-8', 
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Authorization': 'Bearer ' + accessToken,
    }
  }
  console.log("in collab");
  fetch('http://localhost:8080/api/recommendationCF', requestOptions)
  .then(response => response.json())
  .then(data => {
    setCollabFilter(data)}
    )
};

export async function getNeuralNetwork(accessToken, setNeuralNetwork){
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=utf-8', 
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Authorization': 'Bearer ' + accessToken,
    }
  }
  console.log("in collab");
  fetch('http://localhost:8080/api/recommendationNN', requestOptions)
  .then(response => response.json())
  .then(data => {
    setNeuralNetwork(data)}
    )
}


export async function PostInterraction(
    accessToken, product_id, product_name, product_category, product_brand, 
    price, product_description, product_color, user_id, event_type, event_id
    ) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
    product_id: product_id, product_name: product_name, product_category: product_category,
    product_brand: product_brand, price: price, product_description: product_description,
    product_color: product_color, user_id: user_id,event_type: event_type, event_id: event_id
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

  export const getBrandsFromCategory = (category) => {
    let res = []

    for (const element of category){
      res.push(element.product_brand)
    }

    res = [...new Set(res)]
    return res;
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
    res.sort(function(a, b) {
      return a.price - b.price;
    });
    return res;
  }

  export const filterByBrand = (brand, category) => {
    if (brand === "" || brand === "All Brands" || brand === undefined || brand === null){
      return category;
    }

    let res = []
    for (const element of category){
      if (element.product_brand === brand) {
        res.push(element);
      }
    }
    return res;
  }

  
  const showInDropDown = (category, handleChange, toggleChange) => {
    return (
      <Link to="/products">
        <a
        onClick={(e) => {handleChange(category); toggleChange()
           }}
        class="dropdown-item">
          {category[0].product_category}
        </a> 
      </Link>
    );
  }
  
  export const showAllInDropDown = (handleChange, toggleChange) => {
    return (
      <>
      {showInDropDown(all.listBackpack, handleChange, toggleChange)}
      {showInDropDown(all.listBag, handleChange, toggleChange)}
      {showInDropDown(all.listBelt, handleChange, toggleChange)}
      {showInDropDown(all.listBlazer, handleChange, toggleChange)}
      {showInDropDown(all.listDress, handleChange, toggleChange)}
      {showInDropDown(all.listJacket, handleChange, toggleChange)}
      {showInDropDown(all.listJeans, handleChange, toggleChange)}
      {showInDropDown(all.listLegging, handleChange, toggleChange)}
      {showInDropDown(all.listPant, handleChange, toggleChange)}
      {showInDropDown(all.listPyjamas, handleChange, toggleChange)}
      {showInDropDown(all.listShirt, handleChange, toggleChange)}
      {showInDropDown(all.listShoes, handleChange, toggleChange)}
      {showInDropDown(all.listShorts, handleChange, toggleChange)}
      {showInDropDown(all.listSkirt, handleChange, toggleChange)}
      {showInDropDown(all.listSuit, handleChange, toggleChange)}
      {showInDropDown(all.listTop, handleChange, toggleChange)}
      {showInDropDown(all.listTshirt, handleChange, toggleChange)}
      {showInDropDown(all.listWallet, handleChange, toggleChange)}
      {showInDropDown(all.listWatch, handleChange, toggleChange)}
      </>
    )
  }
  
  
  export const DropDownPerGender = (handleChange, toggleChange) => {
    return (  
        <div class="dropdown" id="dropdown" role="menu">
          <div class="dropdown-content">
              {showAllInDropDown(handleChange, toggleChange)}
          </div>
        </div>
    )
  }


  export const getProductFromProductID = (productID) => {
    const product = listOfAllProducts.find(element => element.product_id.toString() === productID.toString());
    return product;
    
  }


  export const getProductFromListProductID = (listOfID) => {
    let res = []
    for (const i in listOfID){
      res.push(getProductFromProductID(listOfID[i]))
    }

    return res;
  }