const unitName = (name) => {
    return { type: "UNITS_NAME", value: name }
}
const selectedUnit = (name) => {
    return { type: "SELECTED_UNIT", value: name }
}

module.exports = { unitName ,selectedUnit}