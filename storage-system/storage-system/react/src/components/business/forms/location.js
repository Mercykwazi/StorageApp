import React from "react";
import * as actions from "../../../actions/location";
import { connect } from "react-redux";
import axios from "axios";
import { log } from "util";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: this.props.address1,
      region: this.props.address2,
      country: this.props.country,
      redirect: false,
      businessName: this.props.business
    };
    this.address1 = this.address1.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  address1(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.props.firstAddress(e.target.value);
    this.setState(change);
  }
  selectRegion(val) {
    this.props.secondAddress(val);
    this.setState({ region: val });
  }

  selectCountry(val) {
    this.props.countryName(val);
    this.setState({ country: val });
  }

  async submitData(e) {
    e.preventDefault();
    const api = process.env.REACT_APP_URL;

    var results = await axios.post(api + "/location", {
      address1: this.props.address1,
      address2: this.props.address2,
      country: this.props.country,
      business: this.state.businessName
    });
    if (results.status === 201) {
      this.setState({
        redirect: true
      });
    } else if (results.status === 500) {
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/blocks" />;
    }
    return (
      <div>
        <div className="topnav">
          <Link to={"/business"}>Business</Link>
          <Link to={"/view-business"}>view-business</Link>
          <Link to={"/location"} className="active">
            Location
          </Link>
          <Link to={"/blocks"}>blocks</Link>
          <Link to={"/view-blocks"}>view-blocks</Link>
          <Link to={"/unit-type"}>unit-type</Link>
          <Link to={"/units"}>units</Link>
          <Link to={"/log-out"}>Log-out</Link>
          <Link to={"/business-unites"}>View Reserved unites</Link>
        </div>
        <h1>Enter your location details below</h1>
        <form>
          <div className="location">
            <div>
              <label htmlFor="address1">Address1:</label>
              <br />
              <input
                name="address1"
                type="text"
                placeholder="street name"
                onChange={this.address1}
                value={this.state.firstAddress}
              />
            </div>
            <br />

            <div>
              <label htmlFor="address2">Country:</label>
              <br />
              <CountryDropdown
                value={this.state.country}
                onChange={val => this.selectCountry(val)}
              />
            </div>

            <div>
              <label htmlFor="address2">Region:</label>
              <br />
              <RegionDropdown
                country={this.state.country}
                type="text"
                placeholder="city"
                onChange={this.selectRegion}
                value={this.state.region}
              />
            </div>
            <br />

            <br />
            <button className="next" onClick={this.submitData}>
              next
            </button>
            <br />
            <br />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    address1: state.location.address1,
    address2: state.location.address2,
    country: state.location.countryName,
    business: state.viewBusiness.selectedBusiness,
    state: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    firstAddress: firstAddress => {
      dispatch(actions.firstAddress(firstAddress));
    },
    secondAddress: address => {
      dispatch(actions.secondAddress(address));
    },
    countryName: country => {
      dispatch(actions.countryName(country));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);
