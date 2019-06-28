import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/selectUnits';
import available from '../../actions/availableUnitType'
import axios from 'axios';
import { log } from 'util';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router'
import { protectRoutes } from '../protectedRoutes'
import jwtDecode from 'jwt-decode';
import history from '../../history'

class ViewUnits extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            unitTypeDetail: [],
            availableUnitType: this.props.availableUnitType,
            redirect: false,
            selectedUnitType: this.props.unitType,
            selectedLocations: this.props.loc,
            units: this.props.unitAvailable
        }
        this.unitsDetails = this.unitsDetails.bind(this)
        this.selectedUnit = this.selectedUnit.bind(this)
        this.submitUnit = this.submitUnit.bind(this)
    }

    componentDidMount() {
        this.unitsDetails()
        this.selectedUnit()
    }

    async submitUnit(e) {
        e.preventDefault()
        var reservedRoom = this.refs.selectedUnit.value
        var token = sessionStorage.getItem('jwtToken');
        const decodedToken = jwtDecode(token)
        var reservedDetails = await axios.post("http://localhost:3003/reserved/", { id: reservedRoom, decodedToken: decodedToken })
        history.push('/rented-Unites')

    }
    async viewReservedUnit() {
        history.push('/rented-Unites')

    }


    async unitsDetails() {
        var details = await axios.get("http://localhost:3003/units/", protectRoutes())
        var unitDetail = details.data

        this.setState({ unitsDetail: unitDetail })
    }

    async selectedUnit() {
        console.log('this.state.unittype',this.props.unitType);
        
        var details = await axios.get("http://localhost:3003/selectUnit/" + this.props.unitType)
        var availableUnits = details.data
        console.log('available',availableUnits);
        
        this.props.availableUnit(availableUnits)
        this.setState({ units: availableUnits })
    }


    render() {
        console.log("this.state of un", this.state)
        return (<div>
            <h1>Available unit/(s)</h1>
            <form >
                <div className="blocks">
                    <h2>Units</h2>
                    <select>
                        <option value="select your your unit">select your unit:</option>
                        {this.state.units.length > 0 ? this.state.units.map(unit => {
                            return <option key={this.state.units.indexOf(unit)} ref="selectedUnit" value={`${unit.id}`}>{unit.name}</option>
                        }) : null}
                    </select><br />
                    <button className='button' onClick={this.submitUnit} >Reserve</button>
                </div>
            </form>

        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        units: state.units.unitName,
        business: state.viewBusiness.selectedBusiness,
        unitType: state.selectUnitType.selectUnit,
        loc: state.selectUnitType.selectedLocation,
        availableUnitType: state.availableUnitType.unitTypeAvailable,
        unitAvailable: state.availableUnitType.unitAvailable,
        state: state,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        selectedUnitType: unit => {
            dispatch(actions.selectedUnits(unit))
        },
        availableUnit: (units) => {
            dispatch(available.unitAvailable(units))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUnits)