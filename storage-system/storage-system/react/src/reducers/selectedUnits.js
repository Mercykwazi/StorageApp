export default function selectUnitType(state = { selectUnit: "", selectedLocation:"",selectingUnit:"" }, action) {
    var newState = state;
    switch (action.type) {
        case "SELECT_UNIT":
            newState = { ...newState, selectUnit: action.value }
            break;
        case "SELECT_LOCATION":
            newState = { ...newState, selectedLocation: action.value }
            break;
            case "SELECT_A_UNIT":
            newState={...newState,selectingUnit:action.value}
       break;
            default:
            newState = { ...newState }
            break;
    }
    return newState;
}

