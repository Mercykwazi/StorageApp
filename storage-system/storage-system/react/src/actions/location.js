
const firstAddress = (name) => {
    return { type: "ADDRESS1", value: name }
}
const secondAddress = text => {
 return { type: "ADDRESS2", value: text }
}
const countryName=country=>{
    return{type:"COUNTRY_NAME",value:country}
}

module.exports = {
    firstAddress,
    secondAddress,
    countryName
}