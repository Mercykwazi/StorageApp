const unitType = (name) => {
  return { type: "UNIT_TYPE", value: name }
};

const length = (length) => {
    return { type: "LENGTH", value: length }
};

const width = (width) => {
    return { type: "WIDTH", value: width }
};

const height = (height) => {
    return { type: "HEIGHT", value: height }
};

module.exports = { unitType, length, width, height }