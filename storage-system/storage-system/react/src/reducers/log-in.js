export default function logIn(state = {  email: "", password: "" }, action) {
    var nextState = state;
    switch (action.type) {
        case "PASSWORD":
            nextState = { ...nextState, password: action.value }
            break;
            case "EMAIL":
            nextState = { ...nextState, email: action.value }
            break;
        default:
            nextState = { ...nextState }
            break;

    }
    return nextState;
}