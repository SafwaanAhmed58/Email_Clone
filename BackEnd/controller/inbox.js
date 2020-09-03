let expObj = {};
let db = require('./../dbClient/mongo/connection')
const collection = "inboxList"
expObj.getInboxList = async (req) => {
    console.log("Inside Inbox List method", JSON.stringify(req.query));
    let id = parseInt(req.query.id);
    let response;
    if (id) {
        response = await db.find(collection, { toId: id }, { mailId: -1 })
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
        console.log("Inside else if")
        return response;

    } else {
        console.log("Inside Else")
        return {
            status: 404,
            message: `Inbox list for Id ${parseInt(req.query.id)} not found`
        }
    }
}

expObj.viewInboxMail = async (req) => {
    console.log("Inside view inbox Mail", JSON.stringify(req.query));
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
    }
    else if (Object.keys(response).length > 0) {
        console.log("Inside Else IF")
        return response;
    } else {
        console.log("Inside Else")
        return {
            status: 404,
            message: `Unable to fetch mail for Id ${parseInt(req.query.id)}`
        }
    }
}

expObj.insertInboxMail = async (req) => {
    console.log("Inside insert Inbox mail", JSON.stringify(req))
    let response;
    if (req.toId && req.from && req.email && req.subject && req.mailBody) {
        let mailId = await db.getNewCustomerId({ key: "inboxId" })
        console.log("Mail Id for inbox", mailId)
        if (mailId !== null) {
            req.mailId = mailId;
        }
        response = await db.insertDocument(collection, req);
        console.log("Response Obj:", JSON.stringify(response))
    } else {
        console.log("Params missing in insert inbox mail")
        return {
            success: false
        }
    }
    if (response == true) {
        console.log("Inbox updated successfully")
        return {
            success: true
        }
    } else {
        console.log("Failed to update inbox")
        return {
            success: false
        }
    }
}

module.exports = expObj;