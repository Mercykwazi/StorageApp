import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/selectUnits";
import axios from "axios";
import { log } from "util";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router";
import { protectRoutes } from "../protectedRoutes";
import history from "../../history";

class ViewUnitType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitTypeDetail: [],
      availableUnitType: this.props.availableUnitType,
      redirect: false,
      selectedUnitType: this.props.unitType,
      selectedLocations: this.props.loc
    };
    this.unitTypeDetails = this.unitTypeDetails.bind(this);
    this.selectedLocationDetails = this.selectedLocationDetails.bind(this);
    this.getUnites = this.getUnites.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    this.unitTypeDetails();
    this.selectedLocationDetails();
  }

  async next() {
    history.push("/view-units");
  }
  async unitTypeDetails() {
    var business = await axios.get(
      "http://localhost:3003/unitType/",
      protectRoutes()
    );
    var unitsD = business.data.rows;
    console.log("what is this", unitsD);
    this.setState({ unitTypeDetail: unitsD });
  }
  async selectedLocationDetails() {
    console.log("what is this3", this.props.loc);
    var results = await axios.get(
      "http://localhost:3003/selectLocation/" + this.props.loc,
      protectRoutes()
    );
    var availableUnitTypes = results.data;
    console.log("availab", results);
    this.setState({ availableUnitType: availableUnitTypes });
  }

  getUnites(e) {
    e.preventDefault();
    this.props.selectedUnitType(e.target.value);
  }

  render() {
    return (
      <div>
        <h1>Available unit/(s)</h1>
        <form>
          <div className="blocks">
            <h2>unit-type</h2>
            <select onChange={this.getUnites}>
              <option value="Select unit type">Select Unit type:</option>
              {this.state.availableUnitType.length > 0
                ? this.state.availableUnitType.map(item => {
                    return (
                      <option
                        key={this.state.availableUnitType.indexOf(item)}
                        value={`${item.name} ${item.length} ${item.width} ${
                          item.height
                        }`}
                      >
                        {" "}
                        {item.name} {item.length}(L), {item.width}(W),{" "}
                        {item.height}(H){" "}
                      </option>
                    );
                  })
                : null}
            </select>
            <br />
            <button className="customerNextButton" onClick={this.next}>
              Next
            </button>
          </div>
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
    availableUnitType: state.availableUnitType.unitTypeAvailable,
    state: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    selectedUnitType: unit => {
      dispatch(actions.selectedUnits(unit));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUnitType);
