import React from "react";
import * as actions from "../../../actions/units";
import { connect } from "react-redux";
import axios from "axios";
import { protectRoutes } from "../../protectedRoutes";
import history from "../../../history";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { log } from "util";

class Units extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.units,
      selectedUnitType: this.props.unitType,
      unitTypeDetail: [],
      redirect: false
    };
    this.unitName = this.unitName.bind(this);
    this.unitTypeDetails = this.unitTypeDetails.bind(this);
    this.unitsDetails = this.unitsDetails.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    this.unitTypeDetails();
  }

  unitName(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.props.availableUnits(e.target.value);
    this.setState(change);
  }
  async unitTypeDetails() {
    var results = await axios.get(
      "http://localhost:3003/unitType/",
      protectRoutes()
    );
    var unitType = results.data.rows;
    this.setState({ unitTypeDetail: unitType });
  }

  async unitsDetails(e) {
    e.preventDefault();
    var findTheItem = this.props.unitType.split(" ");
    var unitType = this.state.unitTypeDetail;
    var results = unitType.find(item => {
      return (
        item.name === findTheItem[0] &&
        item.length === +findTheItem[1] &&
        item.width === +findTheItem[2] &&
        item.height === +findTheItem[3]
      );
    });
    var units = {
      name: this.props.units,
      id: this.state.unitTypeDetail,
      selectedUnit: this.props.unitType,
      selectedBusiness: this.props.business,
      foundObject: results
    };

    const api = process.env.REACT_APP_URL;

    var unitsResults = await axios.post(api + "units/", units);
  }
  next(e) {
    e.preventDefault();
    history.push("/business");
  }

  render() {
    return (
      <div>
        <div className="topnav">
          <Link to={"/business"}>Business</Link>
          <Link to={"/view-business"}>view-business</Link>
          <Link to={"/location"}>Location</Link>
          <Link to={"/blocks"}>blocks</Link>
          <Link to={"/view-blocks"}>view-blocks</Link>
          <Link to={"/unit-type"}>unit-type</Link>
          <Link to={"/units"} className="active">
            units
          </Link>
          <Link to={"/log-out"}>Log-out</Link>
          <Link to={"/business-unites"}>View Reserved unites</Link>
        </div>
        <div className="selectedUnit">
          <p>Available unit types</p>
          <select
            onChange={e => {
              this.props.selectedUnitType(e.target.value);
            }}
          >
            <option value="Select unit type">Select Unit type:</option>
            {this.state.unitTypeDetail.length > 0
              ? this.state.unitTypeDetail.map(item => {
                  return (
                    <option
                      key={this.state.unitTypeDetail.indexOf(item)}
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
        </div>

        <form>
          <div className="business">
            <div>
              <label htmlFor="name">Unit Name:</label>
              <br />
              <input
                name="name"
                type="text"
                onChange={this.unitName}
                value={this.state.name}
              />{" "}
              <br />
              <button
                className="btn"
                onClick={this.unitsDetails}
                disabled={!this.state.name}
              >
                add
              </button>
            </div>
            <br />
            <div />
            <br />
            <button className="next" onClick={this.next}>
              Done
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
    unitType: state.units.selectedUnit,
    state: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    availableUnits: name => {
      dispatch(actions.unitName(name));
    },
    selectedUnitType: unit => {
      dispatch(actions.selectedUnit(unit));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Units);
