import React from "react";
import * as actions from "../../../actions/view-business";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from "../../../history";

class ViewBusiness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessDetail: [],
      selectedBusiness: this.props.select,
      errorMessage: "",
      err: false
    };
    this.businessDetails = this.businessDetails.bind(this);
    this.submitData = this.submitData.bind(this);
  }
  componentDidMount() {
    this.businessDetails();
  }

  async businessDetails() {
    var token = sessionStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    var decodedEmail = decodedToken.email;
    const api = process.env.REACT_APP_URL;

    var business = await axios.get(api + "/business/" + decodedEmail);
    var businessD = business.data.rows;
    this.setState({ businessDetail: businessD });
  }

  submitData() {
    history.push("/location");
  }

  render() {
    return (
      <div>
        <div className="topnav">
          <Link to={"/business"}>Business</Link>
          <Link to={"/view-business"} className="active">
            view-business
          </Link>
          <Link to={"/location"}>Location</Link>
          <Link to={"/blocks"}>blocks</Link>
          <Link to={"/view-blocks"}>view-blocks</Link>
          <Link to={"/unit-type"}>unit-type</Link>
          <Link to={"/units"}>units</Link>
          <Link to={"/log-out"}>Log-out</Link>
          <Link to={"/business-unites"}>View Reserved unites</Link>
        </div>
        <h2>Select your business</h2>
        <div className="view-business">
          <select onChange={e => this.props.setTheBusiness(e.target.value)}>
            <option value="Select business">Select business:</option>
            {this.state.businessDetail.length > 0
              ? this.state.businessDetail.map(item => {
                  return (
                    <option
                      key={this.state.businessDetail.indexOf(item)}
                      value={item.business_name}
                    >
                      {item.business_name}
                    </option>
                  );
                })
              : null}
          </select>
          <br />
          <button className="next" onClick={this.submitData}>
            next
          </button>
          <br />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    select: state.viewBusiness.selectedBusiness,
    state: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setTheBusiness: name => {
      dispatch(actions.businessName(name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewBusiness);
