const Validator = require("validator");
const isEmpty = require("is-empty");
const User = require("../../models/schema/user")

const validateRegistrationData = async (data) => {
    let errors = {}

    data.username = !isEmpty(data.username) ? data.username : "";
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    errors = await validateName(data,errors)
    errors = await validateEmail(data.email,errors)
    errors = await validatePassword(data.password,data.password2,errors)

    return {
        errors,
        isValid: isEmpty(errors)
    };

}

async function validateName(data, errors){
    if (Validator.isEmpty(data.firstname)){
        errors.firstname = "First name field is required";
    }
    if (Validator.isEmpty(data.lastname)){
        errors.lastname = "Last name field is required";
    }
    if (Validator.isEmpty(data.username)){
        errors.username = "Username field is required";
    }
    else{
        await User.findOne({username: data.username})
            .then(user =>{
                if(user) errors.username = "Username is already used"
            })
    }
    return errors
}

async function validateEmail(email, errors){
    if (Validator.isEmpty(email)) {
        errors.email = "Email field is required";

    } else if (!Validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }
    else{
        await User.findOne({email: email})
            .then(user =>{
                if(user) errors.email = "Email is already used"
            })
    }

    return errors
}

function validatePassword(p1, p2, errors){
    if (Validator.isEmpty(p1)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(p2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(p1, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(p1, p2)) {
        errors.password2 = "Passwords must match";
    }
    return errors
}

module.exports = {validateRegistrationData}