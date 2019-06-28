export default function viewBlock(state = { selectedBlock:""}, action) {
    var newState = state;
    switch (action.type) {
        case "BLOCK_NAME":
            newState = { ...newState, selectedBlock: action.value }
            break;
        default:
            newState = { ...newState }
            break;
    }
    return newState;
}