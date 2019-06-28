export default function block(state = { blockName: "" }, action) {
    var newState = state;

    switch (action.type) {
        case "Block_Name":
            newState = { ...newState, blockName: action.value }
            break;
        default:
            newState = { ...newState }
            break;
    }
    return newState
}