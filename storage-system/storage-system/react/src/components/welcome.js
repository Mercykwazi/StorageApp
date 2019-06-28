import React from 'react';
import { Redirect } from 'react-router';
import history from '../history'

class Welcome extends React.Component {
    constructor() {
        super()
        this.state = {
            redirectToBusiness: false,
            redirectToCustomer: false,
            storage: []
        }
        this.registerStorage = this.registerStorage.bind(this);
        this.rentStorage = this.rentStorage.bind(this);
        this.viewStorage = this.viewStorage.bind(this);
    }

    registerStorage() {
        this.setState({ redirectToBusiness: true })
    }
    rentStorage() {
        this.setState({ redirectToCustomer: true })
    }
    async  viewStorage() {
        history.push('/view-units-available')
    }

    render() {
        if (this.state.redirectToBusiness) {
            return <Redirect to='/signing-up' />
        }
        if (this.state.redirectToCustomer) {
            return <Redirect to='/sign-up' />
        }
        return (
            <div className={'content-show'}>
                <div>
                <h1 className="storage">Welcome to Storage facility </h1>
                <button className="getStarted" onClick={this.registerStorage}>Register Storage</button>
                <button className="rentStorage" onClick={this.rentStorage}>Rent a Storage</button><br/><br/>
                {/* <button className="viewStorage" onClick={this.viewStorage}>View Available units</button> */}
                </div>
            </div>
        )
    }
}
export default (Welcome)