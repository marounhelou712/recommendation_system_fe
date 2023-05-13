import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import data from "./Data";
import Context from "./Context";
import "./App.css";
import * as all from "./components/listOfAllProducts";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: [],
      products: [],
      category: "Our Products"
    };

    this.routerRef = React.createRef();
  }
  login = (usn, pwd) => {
    let user = data.users.find(u => u.username === usn && u.password === pwd);
    if (user) {
      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };

  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    this.setState({ products }, () => callback && callback());
  };

  addToCart = cartItem => {
    let cart = this.state.cart;
    // if (cart[cartItem.id]) {
    //   cart[cartItem.id].amount += cartItem.amount;
    // } else {
    cart.push(cartItem.product);
    // }
    // if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
    //   cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    // }
    localStorage.setItem("cart", cart);
    this.setState({ cart: cart });
  };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }
    const cart = this.state.cart;
    const products = this.state.products.map(p => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;
      }
      return p;
    });
    this.setState({ products });
    this.clearCart();
  };

  // removeFromCart = cartItemId => {
  //   let cart = this.state.cart;
  //   delete cart[cartItemId];
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   this.setState({ cart });
  // };

  removeFromCart = index => {
    let cart = this.state.cart;
    delete cart[index];
    localStorage.setItem("cart", cart)
    this.setState({ cart })
  }

  clearCart = () => {
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  // componentDidMount() {
  //   let products = localStorage.getItem("products");
  //   let cart = localStorage.getItem("cart");
  //   let user = localStorage.getItem("user");
  //   products = products ? JSON.parse(products) : data.initProducts;
  //   cart = cart ? JSON.parse(cart) : {};
  //   user = user ? JSON.parse(user) : null;
  //   this.setState({ products, user, cart });
  // }

  handleChange = (array) => {
    let productList = array;
    let category = array[0].product_category;
    let gender = array[0].product_created_for;
    let finalArray = category + " / " + gender
    this.setState({ products: productList, category: finalArray});
  }


  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav
              className="navbar container"
              role="navigation"
              aria-label="main navigation"
              style={{backgroundColor: '#f0f8ff'}}
            >
              <div className="navbar-brand">
                <b className="navbar-item is-size-4 ">E-Commerce</b>

                <a
                  href="/"
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>
              <div
                className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}
              >

                <div class="navbar-item has-dropdown is-hoverable" >
                <a class="navbar-link">
                  Categories
                </a>

                <div class="navbar-dropdown is-link">
                    {all.DropDownPerGender("Male", this.handleChange)}
                    {all.DropDownPerGender("Female", this.handleChange)}
                    {all.DropDownPerGender("Unisex", this.handleChange)}
                </div>
              </div>
                
                <Link to="/products" className="navbar-item">
                  Products
                </Link>

                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-link"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <a href="/" className="navbar-item" onClick={this.logout}>
                    Logout
                  </a>
                )}
              </div>
            </nav>

            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
