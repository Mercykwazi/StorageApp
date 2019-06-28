export default function unitType(state = { unitName: "", length: "", width: "", height: "",  }, action) {
    var newState = state;
    switch (action.type) {
        case "UNIT_TYPE":
            newState = { ...newState, unitName: action.value }
            break;
        case "LENGTH":
            newState = { ...newState, length: action.value }
            break;
        case "WIDTH":
            newState = { ...newState, width: action.value }
            break;
        case "HEIGHT":
            newState = { ...newState, height: action.value }
            break;
        default:
            newState = { ...newState }
            break;
    }
    return newState;
}