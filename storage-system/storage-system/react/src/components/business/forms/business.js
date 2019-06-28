import React from "react";
import * as actions from "../../../actions/business";
import { connect } from "react-redux";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { protectRoutes } from "../../protectedRoutes";
import history from "../../../history";

class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      businessName: this.props.name,
      contactName: this.props.contactName,
      telephone: this.props.telephone,
      email: this.props.email,
      errorPresent: false,
      errorMessage: ""
    };
    this.businessName = this.businessName.bind(this);
    this.contactName = this.contactName.bind(this);
    this.telephone = this.telephone.bind(this);
    this.email = this.email.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  email(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.props.updateEmail(e.target.value);
    this.setState(change);
  }

  businessName(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.props.updateName(e.target.value);
    this.setState(change);
  }
  contactName(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.props.updateContactName(e.target.value);
    this.setState(change);
  }
  telephone(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.props.updateTelephone(e.target.value);
    this.setState(change);
  }
  async saveData(e) {
    e.preventDefault();
    var businessDetails = {
      businessName: this.props.name,
      phoneNumber: this.props.telephone,
      email: this.props.email
    };
    const url = process.env.REACT_APP_URL;
    var api = await axios.post(
      url + "/business",
      businessDetails,
      protectRoutes()
    );
    if (api.status === 200) {
      history.push("/view-business");
    } else if (api.status === 203) {
      this.setState({
        errorMessage: api.data.message,
        errorPresent: true,
        input: ""
      });
    }
  }

  render() {
    return (
      <div>
        <div className="topnav">
          <Link to={"/business"} className="active">
            Business
          </Link>
          <Link to={"/view-business"}>view-business</Link>
          <Link to={"/location"}>Location</Link>
          <Link to={"/blocks"}>blocks</Link>
          <Link to={"/view-blocks"}>view-blocks</Link>
          <Link to={"/unit-type"}>unit-type</Link>
          <Link to={"/units"}>units</Link>
          <Link to={"/log-out"}>Log-out</Link>
          <Link to={"/business-unites"}>View Reserved unites</Link>
        </div>
        <h1>Register Your Business Below</h1>
        {this.state.errorPresent && (
          <h3 style={{ color: "white" }}>{this.state.errorMessage}</h3>
        )}
        <form>
          <div className="business">
            <div>
              <label htmlFor="firstName">Business Name:</label>
              <br />
              <input
                name="businessName"
                type="text"
                onChange={this.businessName}
                value={this.state.businessName}
                required
              />
            </div>
            <br />
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
            <br />
            <div>
              <label htmlFor="telephone">Telephone:</label>
              <br />
              <input
                name="telephone"
                type="tel"
                onChange={this.telephone}
                value={this.state.telephone}
                required
              />
            </div>
            <br />

            <button className="button" onClick={this.saveData}>
              submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    name: state.business.name,
    contactName: state.business.contact_name,
    telephone: state.business.contactTelephone,
    email: state.business.contactEmail,
    state: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateName: name => {
      dispatch(actions.businessName(name));
    },
    updateContactName: contactName => {
      dispatch(actions.contactName(contactName));
    },
    updateTelephone: tel => {
      dispatch(actions.telephone(tel));
    },
    updateEmail: email => {
      dispatch(actions.email(email));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Business);
