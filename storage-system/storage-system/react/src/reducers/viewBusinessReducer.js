export default function viewBusiness(state = { selectedBusiness:""}, action) {
    var newState = state;
    switch (action.type) {
        case "BUSINESS_NAME":
            newState = { ...newState, selectedBusiness: action.value }
            break;
        default:
            newState = { ...newState }
            break;
    }
    return newState;
}