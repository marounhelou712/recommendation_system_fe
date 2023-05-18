import React, { Component, Fragment } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import { handleLOGIN } from "./services";
import { Link } from "react-router-dom";


class SignUp extends Component {
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
    
    handleLOGIN("user4","pass4");
    
    this.props.context.login(4);
    
  };
  
  
  // this.setState({ error: "Invalid Credentails" });


  render() {
    return !this.props.context.user ? (
      <Fragment>
        <div className="hero is-link ">
          <div className="hero-body container">
            <h4 className="title">SIGNUP</h4>
          </div>
        </div>
        <br />
        <br />
        <div className="columns is-mobile is-centered is-white is-outlined">
          <div className="column is-one-fifth is-white is-outlined">
            <div className="field">
              <label className="label">First Name: </label>
              <input
                className="input"
                type="text"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Gender: </label>
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
            <Link to="/login" class="button is-ghost is-link is-outlined">
            Back to login</Link>
          </div>
          <div className="column is-one-fifth">
            <div className="field">
              <label className="label">Last Name: </label>
              <input
                className="input"
                type="text"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Username: </label>
              <select
                className="input"
                type="text"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Confirm Password: </label>
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
                Create Account
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    ) : (
      <Redirect to="/home" />
    );
  }
}

export default withContext(SignUp);
