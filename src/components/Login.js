import React, { Component, Fragment } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import { handleLOGIN } from "./services";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  login = () => {
    const { username, password } = this.state;
    // if (!username || !password) {
    //   return this.setState({ error: "Fill all fields!" });
    // } 
    
    // handleLOGIN("user5", "pass5");

    // const acc = localStorage.getItem('access_token');
    let loggedIn = this.props.context.login("regular", "password");
    // if (acc){

    // } else{
    //   this.setState({ error: "Invalid Credentails" });

    // }
    // if (!loggedIn) {
    // }
  };



  render() {
    return !this.props.context.user ? (
      <Fragment>
        <div className="hero is-link ">
          <div className="hero-body container">
            <h4 className="title">Login</h4>
          </div>
        </div>
        <br />
        <br />
        <div className="columns is-mobile is-centered" style={{height: '100vh'}}>
          <div className="column is-one-third">
            <div className="field">
              <label className="label">User Name: </label>
              <input
                className="input"
                type="text"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Password: </label>
              <input
                className="input"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            {this.state.error && (
              <div className="has-text-danger">{this.state.error}</div>
            )}
            <div className="field is-clearfix">
              <button
                className="button is-link is-outlined is-pulled-right"
                onClick={this.login}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    ) : (
      <Redirect to="/products" />
    );
  }
}

export default withContext(Login);
