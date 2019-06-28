export default function location(state = {  address1: "", address2: "",countryName: "", created_at: "", }, action) {
    var nextState = state;
    switch (action.type) {
        case "ADDRESS1":
           
            nextState = { ...nextState, address1: action.value }
            break;
        case "ADDRESS2":
            nextState = { ...nextState, address2: action.value }
            break;
            case "COUNTRY_NAME":
            nextState={...nextState,countryName:action.value}
            break;
        default:
            nextState = { ...nextState }
            break;
    }
    return nextState;
}