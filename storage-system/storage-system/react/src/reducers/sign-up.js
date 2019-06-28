
const initialState = {
    authenticated: false,
    authenticateCustomer: false,
}

export default function authenticate(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case "BUSINESS_AUTHENTICATED":
            newState = { ...state, authenticated: action.value };
            break;
        case "CUSTOMER_AUTHENTICATED":
            newState = { ...state, authenticateCustomer: action.value };
            break;
        default:
            newState = { ...newState }
            break;
    }
    return newState;
};
