import React from "react";
import * as actions from "../../../actions/block";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.blocks,
      businessName: this.props.business,
      redirect: false
    };
    this.storedBlocks = this.storedBlocks.bind(this);
    this.submitData = this.submitData.bind(this);
    this.next = this.next.bind(this);
  }

  storedBlocks(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.props.availableBlocks(e.target.value);
    this.setState(change);
  }

  async submitData(e) {
    e.preventDefault();
    var blockDetails = {
      blockName: this.props.blocks,
      businessName: this.state.businessName
    };
    const api = process.env.REACT_APP_URL;

    await axios.post(api + "/block", blockDetails);
    this.setState({ name: "" });
  }
  next() {
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/view-blocks" />;
    }
    return (
      <div>
        <div className="topnav">
          <Link to={"/business"}>Business</Link>
          <Link to={"/view-business"}>view-business</Link>
          <Link to={"/location"}>Location</Link>
          <Link to={"/blocks"} className="active">
            blocks
          </Link>
          <Link to={"/view-blocks"}>view-blocks</Link>
          <Link to={"/unit-type"}>unit-type</Link>
          <Link to={"/units"}>units</Link>
          <Link to={"/log-out"}>Log-out</Link>
          <Link to={"/business-unites"}>View Reserved unites</Link>
        </div>
        <h1>Enter your block/(s)</h1>
        <form>
          <div className="blocks">
            <div>
              <label htmlFor="name">Block Name:</label>
              <br />
              <input
                name="name"
                type="text"
                onChange={this.storedBlocks}
                value={this.state.name}
              />{" "}
              <button
                className="btn"
                onClick={this.submitData}
                disabled={!this.state.name}
              >
                add
              </button>
            </div>
            <br />
            <div> </div>
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
    blocks: state.block.blockName,
    business: state.viewBusiness.selectedBusiness,
    state: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    availableBlocks: name => {
      dispatch(actions.blockName(name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Block);
