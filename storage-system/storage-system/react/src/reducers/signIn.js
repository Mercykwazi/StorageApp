export default function signIn(state = {  email: "", password: "" }, action) {
    var nextState = state;
    switch (action.type) {
        case "USER_PASSWORD":
            nextState = { ...nextState, password: action.value }
            break;
            case "USER_EMAIL":
            nextState = { ...nextState, email: action.value }
            break;
        default:
            nextState = { ...nextState }
            break;

    }
    return nextState;
}