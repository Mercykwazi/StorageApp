export default function availableUnitType(state = { unitTypeAvailable: "", unitAvailable: "" }, action) {
    var newState = state;

    switch (action.type) {
        case "Unit_Type_Available":
            newState = { ...newState, unitTypeAvailable: action.value }
            break;
        case "unit_Available":
            newState = { ...newState, unitAvailable: action.value }
            break;
        default:
            newState = { ...newState }
            break;
    }
    return newState
}