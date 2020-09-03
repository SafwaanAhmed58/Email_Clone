let userDetails = require('./userDetails');
let inbox = require('./inbox');
let sentMail = require('./sentMail')
var moment = require('moment'); // require
let expObj = {};


expObj.composeMail = async (req) => {

    console.log("compose mail method triggered", JSON.stringify(req.body));
    delete req.body.handlerName;
    delete req.body.methodName;
    let { body } = req;

    return new Promise(async (resolve, reject) => {
        let requestObj = { query: { userEmail: body.to } }
        await userDetails.getUserDetailsBasedOnEmail(requestObj)
            .then(async (resp) => {
                if(resp.status) {
                    resolve({
                        status: 500,
                        message: "Something went wrong"
                    })
                }
                console.log("response after get user details", JSON.stringify(resp))
                let inboxObj = {
                    "toId": resp.userId,
                    "from": body.fromName,
                    "subject": body.subject,
                    "date": moment().format("DD-MM-YYYY"),
                    "email": body.from,
                    "mailId": 0,
                    "mailBody": body.mailBody
                };

                let sentMailObj = {
                    "toEmail": body.to,
                    "toName": resp.userName,
                    "fromEmail": body.from,
                    "fromName": body.fromName,
                    "fromId": body.fromId,
                    "subject": body.subject,
                    "date": moment().format("DD-MM-YYYY"),
                    "mailId": 0,
                    "mailBody": body.mailBody
                }

                let insertInbox = await inbox.insertInboxMail(inboxObj);

                let insertSentMail = await sentMail.insertSentMail(sentMailObj)

                if (insertInbox.success && insertSentMail.success) {
                    let mailId = insertSentMail.mailId?insertSentMail.mailId:""
                    resolve({
                        message: "Mail composed successfully",
                        sentMaiId: mailId
                    })
                } else {
                    reject({
                        status: 500,
                        message: "Something went wrong"
                    }) 
                }
            })
            .catch ( (e) => {
                console.log("In catch of compose", e);
                reject(e)
            })
    })

}


module.exports = expObj;