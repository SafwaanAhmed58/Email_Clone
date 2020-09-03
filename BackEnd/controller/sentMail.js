let expObj = {};
let db = require('./../dbClient/mongo/connection')

const collection = "sentMailList";
expObj.getSentMailList = async (req) => {
    console.log("Inside sent mail List method", JSON.stringify(req.query));
    let id = parseInt(req.query.id);
    let response;
    if (id) {
        response = await db.find(collection, { fromId: parseInt(req.query.id) }, { mailId: -1 })
        console.log("Response Obj:", JSON.stringify(response))
    } else {
        return {
            status: 404,
            message: `Required id parameter`
        }
    }
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
            message: `Sent mail list for Id ${parseInt(req.query.id)} not found`
        }
    }
}

expObj.viewSentMail = async (req) => {
    console.log("Inside view Sent Mail", JSON.stringify(req.query));
    let id = parseInt(req.query.id);
    let response;
    if (id) {
        response = await db.findOne(collection, { mailId: parseInt(req.query.id) });
        console.log("Response Obj:", JSON.stringify(response), JSON.stringify(Object.keys(response)));
    } else {
        return {
            status: 404,
            message: `Required id parameter`
        }
    }

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
            message: `Unable to fetch mail for Id ${parseInt(req.query.id)}`
        }
    }
}

expObj.insertSentMail = async (req) => {
    console.log("Inside insert sent mail", JSON.stringify(req))
    let response;
    let mailId;
    if (req.toEmail && req.fromEmail && req.fromName && req.toName && req.mailBody && req.subject) {
        mailId = await db.getNewCustomerId({ key: "sentMailId" })
        console.log("Mail Id for inbox", mailId)
        if (mailId !== null) {
            req.mailId = mailId;
        }
        response = await db.insertDocument(collection, req);
        console.log("Response Obj:", JSON.stringify(response))
    } else {
        console.log("Required params missing in sent mail Body")
        return {
            success: false
        }
    }
    if (response == true) {
        console.log("Sent mail updated successfully")
        return {
            success: true,
            mailId: mailId
        }
    } else {
        console.log("Failed to update Sent mail")
        return {
            success: false
        }
    }
}

module.exports = expObj;