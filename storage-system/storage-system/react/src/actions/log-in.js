
const password = text => {
    return { type: "PASSWORD", value: text }
}
const emailAddress = (email) => {
    return { type: "EMAIL", value: email }
}
module.exports = {
    password,
    emailAddress

}