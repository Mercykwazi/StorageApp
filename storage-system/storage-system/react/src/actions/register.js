const authorizeBusiness = () => {
    return { type: "BUSINESS_AUTHENTICATED", value: true }
}
const authorizeCustomer = () => {
    return { type: "CUSTOMER_AUTHENTICATED", value: true }
}


module.exports = {
    authorizeBusiness,
    authorizeCustomer
}