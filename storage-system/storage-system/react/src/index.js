import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router';
import store from './store/store';
import { Router, Route } from "react-router-dom";
import Business from './components/business/forms/business';
import Location from './components/business/forms/location';
import UnitType from './components/business/forms/unit-type';
import Block from './components/business/forms/block';
import ViewBusiness from './components/business/forms/view-business'
import ViewBlocks from './components/business/forms/view-blocks';
import Units from './components/business/forms/units';
import Welcome from './components/welcome';
import availableUnits from './components/view-units-available'
import SignUp from './components/customer/sign-up';
import SigningUp from './components/business/sign-up';
import RentedBusinessUnites from './components/business/viewRentedUnites'
import ViewUnitType from './components/customer/selectUnitType'
import './index.css'
import ViewLocation from './components/customer/select-location';
import LogIn from './components/customer/log-in'
import RentedUnites from './components/customer/rented-units'
import jwtDecode from 'jwt-decode'
import history from './history';
import SignIn from "./components/business/log-in"
import LogOut from "./components/business/forms/log-out";
import ViewUnits from "./components/customer/selectUnit"
const app = document.getElementById("root")


export function checkUserStatus() {
    var token = sessionStorage.getItem('jwtToken');
    if (token) {
        const decodedToken = jwtDecode(token)
        if (decodedToken.authority === "businessOwner") {
            store.dispatch({ type: "BUSINESS_AUTHENTICATED", value: true })
            return history.push("/business")
        }
        if (decodedToken.authority === "customer") {
            store.dispatch({ type: "CUSTOMER_AUTHENTICATED", value: true })
            return history.push('/view-location')
        }
    }
}
export const PrivateRouteCustomer = ({
    component: Component,
    ...rest
}) => {
    let authenticated = store.getState().authenticate.authenticateCustomer;
    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? <Component {...rest} /> : <Redirect to="/" />
            }
        />
    );
}


export const PrivateRouteBusinessOwner = ({
    component: Component,
    ...rest
}) => {
    let authenticated = store.getState().authenticate.authenticated;
    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? <Component {...rest} /> : <Redirect to="/" />
            }
        />
    );
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path='/' component={Welcome} />
                <PrivateRouteBusinessOwner path='/business' component={Business} />
                <PrivateRouteBusinessOwner path='/view-business' component={ViewBusiness} />
                <PrivateRouteBusinessOwner path='/location' component={Location} />
                <PrivateRouteBusinessOwner path='/unit-type' component={UnitType} />
                <PrivateRouteBusinessOwner path='/blocks' component={Block} />
                <PrivateRouteBusinessOwner path='/view-blocks' component={ViewBlocks} />
                <PrivateRouteBusinessOwner path='/units' component={Units} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/log-out' component={LogOut} />
                <Route path='/signing-up' component={SigningUp} />
                <PrivateRouteCustomer path='/view-location' component={ViewLocation} />
                <Route path='/log-in' component={LogIn} />
                <Route path="/sign-in" component={SignIn} />
                <Route path='/rented-Unites' component={RentedUnites} />
                <Route path="/select-unit-type" component={ViewUnitType} />
                <Route path="/business-unites" component={RentedBusinessUnites} />
                <Route path="/View-units" component={ViewUnits} />
                <Route path="/view-units-available" component={availableUnits} />
                

            </div>
        </Router>
    </Provider>, app);

