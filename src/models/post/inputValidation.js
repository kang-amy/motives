const Validator = require("validator");
const isEmpty = require("is-empty");
const validatePost = async (data) => {
    let errors = {}

    data.title = !isEmpty(data.title) ? data.title : "";
    data.description = !isEmpty(data.description) ? data.description : "";

    errors = validateStrings(data,errors)
    errors = validateGroup(data.group,errors)
    errors = validateDate(data,errors)
    return {
        errors,
        isValid: isEmpty(errors)
    };

}

function validateStrings(data, errors){
    if (Validator.isEmpty(data.title)) {
        errors.title = "Please fill in all fields";
    }
    if(Validator.isEmpty(data.description)){
        errors.description = "Please fill in all fields";
    }
    return errors
}

function validateGroup(group, errors){
    return errors
}

function validateDate(data, errors){
    if (data.eventStart < Date.now() || data.eventEnd <= data.eventStart) {
        errors.date = "Please enter valid dates";
    }
    return errors
}


module.exports = {validatePost}
