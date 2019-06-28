import React from "react";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import * as actions from "../../actions/selectUnits";
import axios from "axios";
import { log } from "util";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router";
import { protectRoutes } from "../protectedRoutes";
import jwtDecode from "jwt-decode";
import history from "../../history";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ViewLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitTypeDetail: [],
      locationDetail: [],
      availableUnitType: [],
      redirect: false,
      selectedUnitType: this.props.unitType,
      unitsDetail: [],
      selectedLocations: this.props.loc,
      units: []
    };
    this.unitsDetails = this.unitsDetails.bind(this);
    this.unitTypeDetails = this.unitTypeDetails.bind(this);
    this.getUnites = this.getUnites.bind(this);
    this.selectedUnit = this.selectedUnit.bind(this);
    this.locationDetails = this.locationDetails.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.selectedLocationDetails = this.selectedLocationDetails.bind(this);
    this.submitUnit = this.submitUnit.bind(this);
    this.viewReservedUnit = this.viewReservedUnit.bind(this);
  }

  componentDidMount() {
    this.unitTypeDetails();
    this.unitsDetails();
    this.locationDetails();
  }

  async submitUnit() {
    var reservedRoom = this.refs.selectedUnit.value;
    var token = sessionStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    var reservedDetails = await axios.post("http://localhost:3003/reserved/", {
      id: reservedRoom,
      decodedToken: decodedToken
    });
    history.push("/rented-Unites");
  }
  async viewReservedUnit() {
    history.push("/rented-Unites");
  }

  async unitTypeDetails() {
    var business = await axios.get("http://localhost:3003/unitType/");
    var unitsD = business.data.rows;
    this.setState({ unitTypeDetail: unitsD });
  }
  async locationDetails() {
    try {
      const results = await axios.get("http://localhost:3003/location");
      var locationD = results.data.rows;
      this.setState({ locationDetail: locationD });
    } catch (e) {}
  }

  async unitsDetails() {
    const api = process.env.REACT_APP_URL;

    var details = await axios.get(api + "/units");
    var unitDetail = details.data.rows;
    this.setState({ unitsDetail: unitDetail });
  }

  async selectedUnit() {
    const url = process.env.REACT_APP_URL;
    var details = await axios.get(url + "/selectUnit/" + this.props.unitType);
    var availableUnits = details.data;
    this.setState({ units: availableUnits });
  }
  async selectedLocationDetails() {
      const apiLink = process.env.REACT_APP_URL;
    var results = await axios.get(apiLink + "/selectLocation/" + this.props.loc);

    var availableUnitTypes = results.data;
    this.setState({ availableUnitType: availableUnitTypes });
  }

  getUnites(e) {
    e.preventDefault();
    this.props.selectedUnitType(e.target.value);
    setTimeout(() => {
      this.selectedUnit();
    }, 1000);
  }
  getLocation(e) {
    e.preventDefault();
    this.props.selectedLocations(e.target.value);
    setTimeout(() => {
      this.selectedLocationDetails();
    }, 1000);
  }
  render() {
    return (
      <div>
        <div className="topnav">
          <button>
            {" "}
            <Link to={"/rented-Unites"}>ViewUnits</Link>
          </button>
          <button>
            {" "}
            <Link to={"/log-out"}>Log-out</Link>
          </button>
        </div>
        <form>
          <div className="reserveUnit">
            <h2>Please select your location </h2>
            <select onChange={this.getLocation}>
              <option value="select your your location">
                select your preferred location:
              </option>
              {this.state.locationDetail.length > 0
                ? this.state.locationDetail.map(location => {
                    return (
                      <option
                        key={this.state.locationDetail.indexOf(location)}
                        value={location.id}
                      >
                        {location.address2} {location.country}
                      </option>
                    );
                  })
                : null}
            </select>
            <br />
            <h2>Please select your unit-type</h2>
            <select onChange={this.getUnites}>
              <option value="Select unit type">Select Unit type:</option>
              {this.state.availableUnitType.length > 0
                ? this.state.availableUnitType.map(item => {
                    return (
                      <option
                        key={this.state.availableUnitType.indexOf(item)}
                        value={item.business_name}
                      >
                        {" "}
                        {item.name} {item.length} {item.width} {item.height}{" "}
                      </option>
                    );
                  })
                : null}
            </select>
            <br />
            <h2>Please select your unit</h2>
            <select>
              <option value="select your your unit">select your unit:</option>
              {this.state.units.length > 0
                ? this.state.units.map(unit => {
                    return (
                      <option
                        key={this.state.units.indexOf(unit)}
                        ref="selectedUnit"
                        value={`${unit.id}`}
                      >
                        {unit.name}
                      </option>
                    );
                  })
                : null}
            </select>
            <br />
          </div>
          <div>
            {" "}
            <button className="button" onClick={this.submitUnit}>
              Reserve
            </button>
          </div>
          <br />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    units: state.units.unitName,
    business: state.viewBusiness.selectedBusiness,
    unitType: state.selectUnitType.selectUnit,
    loc: state.selectUnitType.selectedLocation,
    selectedUni: state.selectUnitType.selectingUnit,
    state: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    selectedUnitType: unit => {
      dispatch(actions.selectedUnits(unit));
    },
    selectedLocations: location => {
      dispatch(actions.selectLocation(location));
    },
    selectedUnit: units => {
      dispatch(actions.selectedUnit(units));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLocation);
