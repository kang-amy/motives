const responseHandler = (responseData, request , response, next) => {
    if(request.body.newAccessToken)responseData.data = {...responseData.data,newAccessToken:request.body.newAccessToken};
    if (responseData.code >=400 ) {
        const responseJSON = {
            status: 0,
            errors: responseData.errors,
           data: responseData.data
        }
        response.status(responseData.code).json(responseJSON)
    }
    else {
        const responseJSON = {
            status: 1,
            ...responseData
        }
        response.status(responseData.code).json(responseJSON)
    }
}

module.exports = {responseHandler}