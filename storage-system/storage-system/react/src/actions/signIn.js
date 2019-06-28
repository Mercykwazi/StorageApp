
const userPassword = text => {
    return { type: "USER_PASSWORD", value: text }
}
const userEmailAddress = (email) => {
    return { type: "USER_EMAIL", value: email }
}
module.exports = {
    userPassword,
    userEmailAddress

}