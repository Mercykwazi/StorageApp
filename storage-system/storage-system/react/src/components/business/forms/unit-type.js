import React from "react";
import * as actions from "../../../actions/unit-type";
import { connect } from "react-redux";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";

class UnitType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitType: this.props.unitType,
      length: this.props.length,
      width: this.props.width,
      height: this.props.height,
      businessName: this.props.business,
      redirect: false
    };
    this.locationName = this.locationName.bind(this);
    this.length = this.length.bind(this);
    this.width = this.width.bind(this);
    this.height = this.height.bind(this);
    this.submit = this.submit.bind(this);
    this.next = this.next.bind(this);
  }

  length(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.props.updateLength(e.target.value);
    this.setState(change);
  }

  locationName(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.props.updateName(e.target.value);
    this.setState(change);
  }
  width(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.props.updateWidth(e.target.value);
    this.setState(change);
  }
  height(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.props.updateHeight(e.target.value);
    this.setState(change);
  }

  async submit(e) {
    e.preventDefault();
    var insertUnits = {
      storageType: this.props.unitType,
      length: this.props.length,
      width: this.props.width,
      height: this.props.height,
      selectedBusiness: this.state.businessName
    };
    const api = process.env.REACT_APP_URL;
    var unitTypeDetails = await axios.post(api + "/unitType", insertUnits);
    this.setState({ unitType: "", length: "", width: "", height: "" });
  }
  next() {
    this.setState({ redirect: true });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/units" />;
    }
    return (
      <div>
        <div className="topnav">
          <Link to={"/business"}>Business</Link>
          <Link to={"/view-business"}>view-business</Link>
          <Link to={"/location"}>Location</Link>
          <Link to={"/blocks"}>blocks</Link>
          <Link to={"/view-blocks"}>view-blocks</Link>
          <Link to={"/unit-type"} className="active">
            unit-type
          </Link>
          <Link to={"/units"}>units</Link>
          <Link to={"/log-out"}>Log-out</Link>
          <Link to={"/business-unites"}>View Reserved unites</Link>
        </div>
        <h1>Specify your unit type</h1>
        <form>
          <div className="business">
            <div>
              <label htmlFor="unitType">Unit type:</label>
              <br />
              <input
                name="unitType"
                placeholder="garage/warehouse"
                type="text"
                onChange={this.locationName}
                value={this.state.unitType}
              />
            </div>
            <br />
            <div>
              <label htmlFor="length">Length(m):</label>
              <br />
              <input
                name="length"
                placeholder="1200"
                type="number"
                onChange={this.length}
                value={this.state.length}
              />
            </div>
            <br />
            <div>
              <label htmlFor="width">Width(m):</label>
              <br />
              <input
                name="width"
                placeholder="1200"
                type="number"
                onChange={this.width}
                value={this.state.width}
              />
            </div>
            <br />
            <div>
              <label htmlFor="height">height(m):</label>
              <br />
              <input
                name="height"
                placeholder="800"
                type="number"
                onChange={this.height}
                value={this.state.height}
              />{" "}
              <button
                className="btn"
                onClick={this.submit}
                disabled={!this.state.unitType}
                disabled={!this.state.length}
                disabled={!this.state.width}
                disabled={!this.state.height}
              >
                add
              </button>
              <br />
            </div>
            <br />
            <button className="next" onClick={this.next}>
              next
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    unitType: state.unitType.unitName,
    length: state.unitType.length,
    width: state.unitType.width,
    height: state.unitType.height,
    business: state.viewBusiness.selectedBusiness,
    state: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateName: name => {
      dispatch(actions.unitType(name));
    },
    updateLength: length => {
      dispatch(actions.length(length));
    },
    updateWidth: width => {
      dispatch(actions.width(width));
    },
    updateHeight: height => {
      dispatch(actions.height(height));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitType);
