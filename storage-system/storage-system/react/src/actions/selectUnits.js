
const selectedUnits = (name) => {
    return { type: "SELECT_UNIT", value: name }
}
const selectLocation = (newLocation) => {
    console.log('am I called')
    return { type: "SELECT_LOCATION", value: newLocation }
}
const selectedUnit = (unit) => {
    console.log('am I called')
    return { type: "SELECT_A_UNIT", value: unit }
}

module.exports = { selectedUnits,selectLocation,selectedUnit}