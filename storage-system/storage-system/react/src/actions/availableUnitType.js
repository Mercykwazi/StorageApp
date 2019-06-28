const unitTypeAvailable = (type) => {
    return { type: "Unit_Type_Available", value: type }
}
const unitAvailable = (units) => {
    return { type: "unit_Available", value: units }
}

module.exports = { unitTypeAvailable,unitAvailable }