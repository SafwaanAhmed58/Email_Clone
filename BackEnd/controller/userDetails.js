let db = require('./../dbClient/mongo/connection')
let expObj = {};

const collection = "userDetails";

expObj.getUsersList = async (req) => {
    console.log("Inside get user List", JSON.stringify(req.query))

    let response = await db.find(collection, {}, { userId: 1 })

    console.log("Response Obj:", JSON.stringify(response))

    if (response == "server error") {
        return {
            status: 500,
            message: `Internal Server Error`
        }
    } else if (response.length > 0) {
        console.log("Inside IF")
        return response;
    } else {
        console.log("Inside Else")
        return {
            status: 404,
            message: `User List not available`
        }
    }
}

expObj.getUserDetails = async (req) => {
    console.log("Inside get user Details", JSON.stringify(req.query))
    let id = parseInt(req.query.id);
    let response;
    if (id) {
        response = await db.findOne(collection, { userId: id })
    } else {
        return {
            status: 404,
            message: `Required id parameter`
        }
    }

    console.log("Response Obj:", JSON.stringify(response))

    if (response == "server error") {
        return {
            status: 500,
            message: `Internal Server Error`
        }
    } else if (Object.keys(response).length > 0) {
        console.log("Inside IF")
        return response;
    } else {
        console.log("Inside Else")
        return {
            status: 404,
            message: `get user details for Id ${parseInt(req.query.id)} not found`
        }
    }
}

expObj.getUserDetailsBasedOnEmail = async (req) => {

    console.log("Inside get user Details", JSON.stringify(req.query))
    let userEmail = req.query.userEmail;
    let response;
    if (userEmail) {
        response = await db.findOne(collection, { userEmail })
    } else {
        return {
            status: 404,
            message: `Required user Email parameter`
        }
    }

    console.log("Response Obj:", JSON.stringify(response), JSON.stringify(Object.keys(response)))

    if (response == "server error") {
        return {
            status: 500,
            message: `Internal Server Error`
        }
    } else if (Object.keys(response).length > 0) {
        console.log("Inside IF")
        return response;
    } else {
        console.log("Inside Else")
        return {
            status: 404,
            message: `get user details for email ${req.query.userEmail} not found`
        }
    }

}

module.exports = expObj