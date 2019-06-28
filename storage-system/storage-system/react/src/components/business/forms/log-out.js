import React, { Component } from 'react';
import history from '../../../history'

class LogOut extends Component {

  componentDidMount() {
    sessionStorage.removeItem("jwtToken");
    history.push("/");
  }

  render() {
    return (
      <div>
        <p>Logging Out</p>
      </div>
    );
  }
}

export default LogOut;