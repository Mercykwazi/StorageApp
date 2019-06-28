import { combineReducers } from 'redux'
import business from "./businessReducer";
import location from "./locationsReducer";
import unitType from "./unit-type";
import block from "./blockNameReducer";
import viewBusiness from "./viewBusinessReducer";
import viewBlock from "./viewBlockReducer";
import units from "./unitsReducer";
import selectUnitType from "./selectedUnits";
import availableUnitType from "./availableUnitType"
import logIn from './log-in'
import authenticate from './sign-up'
import signIn from "./signIn"

export default combineReducers({
    business, location, unitType, block, viewBusiness,viewBlock,units,selectUnitType,logIn,authenticate,signIn,availableUnitType
});