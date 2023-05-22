import React, { Component, Fragment } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import { handleLOGIN } from "./services";
import { Link } from "react-router-dom";


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
    if (username === "user5" && password === "pass5"){

      handleLOGIN("user5","pass5");
      
      this.props.context.login(5);
      
    } else if (username === "user4" && password === "pass4"){

        handleLOGIN("user4","pass4");
        
        this.props.context.login(4);

    } else if (username == "demo" && password == "demo"){

        handleLOGIN("demo", "demo");

        this.props.context.login(38);
    }
      else {
      this.setState({ error: "Invalid Credentails" });
    }
    
  };
  
  


  render() {
    return !this.props.context.user ? (
      <Fragment>
        <div className="hero is-link ">
          <div className="hero-body container">
            <h4 className="title">LOGIN</h4>
          </div>
        </div>
        <br />
        <br />
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
              <label className="label">Username: </label>
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
            <Link class="button is-small is-link is-inverted has-background-light"
            to="/signup">
              Don't have an account? Sign up now!
            </Link>

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
      <Redirect to="/home" />
    );
  }
}

export default withContext(Login);
