import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Context from "./Context";
import ForYou from "./components/foryou";
import SignUp from "./components/signup";
import "./App.css";
import { PostInterraction, getCollaborativeFiltering, getProductFromListProductID, getContentBased, getNeuralNetwork, filterByBrand } from "./components/services";
import { listWatch } from "./components/listOfAllProducts";
import { DropDownPerGender, filterByPrice } from "./components/services";
import { getBestSeller } from "./components/services";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: [],
      initialProducts: [],
      products: [],
      Recommended1: [],
      Recommended2: [],
      bestSeller: [],
      category: "Our Products",
      minprice: "",
      maxprice: "",
      brand: "",
      isDropdownOpen: true,
      nbInteraction: 0,
    };

    this.routerRef = React.createRef();
  }

  setRecommendation1 = (val) => {
    this.setState({ Recommended1: getProductFromListProductID(val) });
    localStorage.setItem("rec1", JSON.stringify(getProductFromListProductID(val)))
  }

  setRecommendation2 = (val) => {
    this.setState({ Recommended2: getProductFromListProductID(val) });
    localStorage.setItem("rec2", JSON.stringify(getProductFromListProductID(val)))
  }

  setRecommendation3 = (val) => {
    this.setState({ Recommended3: getProductFromListProductID(val) });
    localStorage.setItem("rec3", JSON.stringify(getProductFromListProductID(val)))
  }

  login = (data) => {
    this.setState({ user: data });
    localStorage.setItem('user', data);
    setTimeout(() => {
      let acc = localStorage.getItem("access_token");
      if (acc) {
      getCollaborativeFiltering(acc, this.setRecommendation1);
      getNeuralNetwork(acc,this.setRecommendation2);
      }
    },1000)
  };

  logout = e => {
    e.preventDefault();
    this.setState({ user: null, cart: [] });
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("rec1");
    localStorage.removeItem("rec2");
    window.location.pathname = "/home";
  };

  setUser = () => {
    this.setState({user: 4});
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    this.setState({ products }, () => callback && callback());
  };

  viewProduct = product => {
    let acc = localStorage.getItem("access_token");
    let user = localStorage.getItem("user");
    if (acc) {
    PostInterraction(acc, product.product.product_id, product.product.product_name, product.product.product_category, 
      product.product.product_brand, product.product.price, 
      product.product.product_description, product.product.product_color, user, "view", 1);
      let newnb = this.state.nbInteraction
      if (newnb > 2){
        getCollaborativeFiltering(acc, this.setRecommendation1);
        getNeuralNetwork(acc,this.setRecommendation2);
        this.setState({nbInteraction: 0})
      } else {
        this.setState({nbInteraction: newnb+1})
      }
    }
    }
  
  addToCart = cartItem => {
    let acc = localStorage.getItem("access_token");
    let user = localStorage.getItem("user");

    let cart = this.state.cart;
    cart.push(cartItem.product);
    localStorage.setItem("cart", cart);
    this.setState({ cart: cart });
    if (acc) {

      let newnb = this.state.nbInteraction;
      if (newnb > 2){
        getCollaborativeFiltering(acc, this.setRecommendation1);
        getNeuralNetwork(acc,this.setRecommendation2);
        this.setState({nbInteraction: 0})
      } else {
        this.setState({nbInteraction: newnb+1})
      }

      PostInterraction(acc, cartItem.product.product_id, cartItem.product.product_name, cartItem.product.product_category, 
        cartItem.product.product_brand, cartItem.product.price, 
        cartItem.product.product_description, cartItem.product.product_color,user, "add to cart", 2);

        


    } else {
      this.routerRef.current.history.push("/login");
    }
  };

  clearCart = () => {
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart: cart });
  };

  checkout = () => {
    let acc = localStorage.getItem("access_token");
    let user = localStorage.getItem("user");
    if (acc) {
    let cart = this.state.cart;
    cart.map(p => {
      PostInterraction(acc, p.product_id, p.product_name, p.product_category, 
        p.product_brand, p.price, p.product_description, p.product_color,
        user, "purchase", 3);
        let newnb = this.state.nbInteraction;
        if (newnb > 2){
          getCollaborativeFiltering(acc, this.setRecommendation1);
          getNeuralNetwork(acc,this.setRecommendation2);
          this.setState({nbInteraction: 0})
        } else {
          this.setState({nbInteraction: newnb+1})
        }
    });
    this.clearCart();
  
  }
    else{
      this.routerRef.current.history.push("/login");
      return;
    }
  };

  removeFromCart = index => {
    let cart = this.state.cart;
    delete cart[index];
    localStorage.setItem("cart", cart)
    this.setState({ cart })
  }


  setBestSeller = (val) => {
    this.setState({bestSeller: getProductFromListProductID(val)})
  }

  componentDidMount() {

    getBestSeller(this.setBestSeller);

    let CF = localStorage.getItem("rec1");
    let NN = localStorage.getItem("rec2");
    if (CF){
      this.setState({ Recommended1: JSON.parse(CF) });
    }
    if (NN){
      this.setState({ Recommended2: JSON.parse(NN) });
    }
  }
  // this.setBestSeller(['703','1591','1592','3201','3250','4410']);
  // this.setRecommendation1(['302','704', '1595', '3206', '3250', '4415'])
  // this.setRecommendation2(['505','805', '1600', '3210', '3250', '4500'])

  handleChange = (array) => {
    let productList = array;
    let minPrice = this.state.minprice;
    let maxPrice = this.state.maxprice;
    this.resetBrand();
    let category = array[0].product_category;
    this.setState({ products: filterByPrice(minPrice, maxPrice, productList), initialProducts: productList, category: category});
    // this.setState({ products: productList, initialProducts: productList, category: category});

  }

  changeMinPrice = value => {
    this.setState({minprice: value})
  }

  changeMaxPrice = value => {
    this.setState({maxprice: value})
  }

  filterPrice = () => {
    let brand = this.state.brand;

    let brandFilter = filterByBrand(brand, this.state.initialProducts)
    this.setState({products: filterByPrice(this.state.minprice, this.state.maxprice,brandFilter)});
    
  }

  filterBrand = (brand) => {
    let minprice = this.state.minprice;
    let maxprice = this.state.maxprice;

    let priceFilter = filterByPrice(minprice, maxprice, this.state.initialProducts);
    this.setState({products: filterByBrand(brand,priceFilter), brand: brand})
  }

  resetPrice = () => {
    this.setState({products: this.state.initialProducts, minprice: -1, maxprice: -1});
    const allInputs = document.querySelectorAll(".input");

    for (const element of allInputs){
      element.value= ""
    }
  }

  resetBrand = () => {
    this.setState({brand: ""})
  }

  reset = () =>{
    this.resetBrand();
    this.resetPrice();
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  openDropDown = () => {
    this.setState({ isDropdownOpen: true })
  };

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
          checkout: this.checkout,
          viewProduct: this.viewProduct,
          changeMinPrice: this.changeMinPrice,
          changeMaxPrice: this.changeMaxPrice,
          filterPrice: this.filterPrice,
          resetPrice: this.resetPrice,
          setUser: this.setUser,
          filterBrand: this.filterBrand,
          resetBrand: this.resetBrand,
          reset: this.reset,
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App" style={{backgroundColor:'#f0f8ff', minHeight: '100vh'}}>
            <nav
              className="navbar container"
              role="navigation"
              aria-label="main navigation"
              style={{backgroundColor: '#f0f8ff'}}
            >
              <div className="navbar-brand">
                <b className="navbar-item is-size-4 " onClick={() => window.location.href="/home"}>RECOMs as a Service</b>

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

              <Link to="/home" className="navbar-item">
                Home
              </Link>

                <div class="navbar-item has-dropdown is-hoverable"  onMouseEnter={() => this.openDropDown()}>
                <a class="navbar-link">
                  Products
                </a>

                <div class="navbar-dropdown is-link" 
                >
                    { this.state.isDropdownOpen && DropDownPerGender(this.handleChange, this.toggleDropdown)}
                </div>
              </div>

                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-link"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>

                <div class="navbar-end">
                {!localStorage.getItem('access_token') && !this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <a href="/" className="navbar-item" onClick={this.logout}>
                    Logout
                  </a>
                )}
                </div>
              </div>
            </nav>

            <Switch>
              <Route exact path="/" component={ForYou} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/home" component={ForYou}/>
              <Route exact path="/signup" component={SignUp}/>
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
