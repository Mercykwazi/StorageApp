import React from "react";
import * as actions from "../../../actions/view-blocks";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ViewBlocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocksDetail: [],
      selectedBlock: this.props.select,
      redirect: false
    };
    this.blocksDetails = this.blocksDetails.bind(this);
    this.submitData = this.submitData.bind(this);
  }
  componentDidMount() {
    this.blocksDetails();
  }

  async blocksDetails() {
    const api = process.env.REACT_APP_URL;

    var blocks = await axios.get(api + "/block/" + this.props.selectedBusiness);
    var blocksD = blocks.data;
    this.setState({ blocksDetail: blocksD });
  }

  submitData() {
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/unit-type" />;
    }
    return (
      <div>
        <div className="topnav">
          <Link to={"/business"}>Business</Link>
          <Link to={"/view-business"}>view-business</Link>
          <Link to={"/location"}>Location</Link>
          <Link to={"/blocks"}>blocks</Link>
          <Link to={"/view-blocks"} className="active">
            view-blocks
          </Link>
          <Link to={"/unit-type"}>unit-type</Link>
          <Link to={"/units"}>units</Link>
          <Link to={"/log-out"}>Log-out</Link>
          <Link to={"/business-unites"}>View Reserved unites</Link>
        </div>
        <h2>select your blocks</h2>
        <div className="view-business">
          <select onChange={e => this.props.setTheBlock(e.target.value)}>
            <option value="Select business">Select block:</option>
            {this.state.blocksDetail.length > 0
              ? this.state.blocksDetail.map(item => {
                  return (
                    <option
                      key={this.state.blocksDetail.indexOf(item)}
                      value={item.name}
                    >
                      {item.name}
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
    select: state.viewBlock.selectedBlock,
    selectedBusiness: state.viewBusiness.selectedBusiness,
    state: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setTheBlock: name => {
      dispatch(actions.blockName(name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewBlocks);
