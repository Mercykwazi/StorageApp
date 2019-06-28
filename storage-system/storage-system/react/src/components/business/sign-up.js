import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { protectRoutes } from "../protectedRoutes";
import { checkUserStatus } from "../../index";
import * as actions from "../../actions/register";
import history from "../../history";
//require('dotenv').config()

class SigningUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      firstName: "",
      email: "",
      redirect: false,
      isPasswordVisible: false
    };
    this.contactName = this.contactName.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.saveData = this.saveData.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    checkUserStatus();
  }

  email(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  contactName(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }
  password(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }
  async saveData(e) {
    e.preventDefault();
    var businessDetails = {
      name: this.state.firstName,
      email: this.state.email,
      password: this.state.password
    };
    const api = process.env.REACT_APP_URL;
    var results = await axios.post(api + "/registerBusiness", businessDetails);
    if (results.status != 200) {
    } else {
      var checking = sessionStorage.setItem("jwtToken", results.data);
      protectRoutes();
      this.props.authorizeBusiness();
      history.push("/business");
    }
  }
  async logIn() {
    history.push("/sign-in");
  }
  render() {
    return (
      <div>
        <h1>Fill in your personal details</h1>
        <div className="signing" />
        <form>
          <div className="business">
            <div>
              <label htmlFor="email">Email:</label>
              <br />
              <input
                name="email"
                type="email"
                onChange={this.email}
                value={this.state.email}
                required
              />
            </div>
            <div className="password">
              Password:
              <br />
              {this.state.isPasswordVisible ? (
                <input
                  name="password"
                  type="text"
                  onChange={e => this.setState({ password: e.target.value })}
                  value={this.state.password}
                  required
                />
              ) : (
                <input
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                  value={this.state.password}
                />
              )}
              <br />
              <p
                className="show"
                onClick={() =>
                  this.setState({
                    isPasswordVisible: !this.state.isPasswordVisible
                  })
                }
              >
                {this.state.isPasswordVisible ? "Hide" : "Show"} Password
              </p>
            </div>
            <button className="button" onClick={this.saveData}>
              sign up
            </button>
          </div>
        </form>
        <footer className="business">
          <h1>Already have an account?</h1>
          <button className="button" onClick={this.logIn}>
            Log in
          </button>
        </footer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    state: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authorizeBusiness: () => {
      dispatch(actions.authorizeBusiness());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigningUp);
