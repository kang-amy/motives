const Validator = require("validator");
const isEmpty = require("is-empty");


const validateLoginData = async (data) => {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    errors = await validateEmail(data.email,errors)
    errors = validatePassword(data.password,errors)

    return {
        errors,
        isValid: isEmpty(errors)
    };

}

async function validateEmail(email, errors){
    if (Validator.isEmpty(email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }
    return errors
}

function validatePassword(pass, errors){
    if (Validator.isEmpty(pass)) {
        errors.password = "Password field is required";
    }
    return errors
}

module.exports = {validateLoginData}