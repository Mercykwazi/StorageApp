export default function units(state = { unitName:"",selectedUnit:""}, action) {
    var newState = state;
    switch (action.type) {
        case "UNITS_NAME":
            newState = { ...newState, unitName: action.value }
            break;
            case "SELECTED_UNIT":
            newState={...newState,selectedUnit:action.value}
        default:
            newState = { ...newState }
            break;
    }
    return newState;
}