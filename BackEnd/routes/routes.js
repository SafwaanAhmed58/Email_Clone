const router = require('express').Router();
const controller = require('../controller/mainController');
let sendResponse = async function (req, res) {
    console.log("Request Headers", JSON.stringify(req.headers))
    console.log('Request Param', req.body.handlerName, req.body.methodName);
    return await controller[req.body.handlerName][req.body.methodName](req)
        .then((item) => {
            console.log('item: ', item);
            res.status(item.status || 200).json(item.messages || item).end()
        })
        .catch((error) => {
            res.status(error.status || 500).send(error.body || error).end()
        })
}

router.get('/getUsersList', (req, res, next) => {
    console.log("get Users List Route Hit.");
    req.body.handlerName = 'userDetails';
    req.body.methodName = 'getUsersList';
    next();
}, sendResponse)

router.get('/getUserDetails', (req, res, next) => {
    console.log("get User Details Route Hit.");
    req.body.handlerName = 'userDetails';
    req.body.methodName = 'getUserDetails';
    next();
}, sendResponse)

router.get('/getUserDetailsBasedOnEmail', (req, res, next) => {
    console.log("get User Details based on email Route Hit.");
    req.body.handlerName = 'userDetails';
    req.body.methodName = 'getUserDetailsBasedOnEmail';
    next();
}, sendResponse)

router.get('/getInboxList', (req, res, next) => {
    console.log("Inbox List Route Hit.");
    req.body.handlerName = 'inbox';
    req.body.methodName = 'getInboxList';
    next();
}, sendResponse)

router.get('/viewInboxMail', (req, res, next) => {
    console.log("View Inbox Mail List Route Hit.");
    req.body.handlerName = 'inbox';
    req.body.methodName = 'viewInboxMail';
    next();
}, sendResponse)

router.get('/getSentMailList', (req, res, next) => {
    console.log("Sent Mail List Route Hit.");
    req.body.handlerName = 'sentMail';
    req.body.methodName = 'getSentMailList';
    next();
}, sendResponse)

router.get('/viewSentMail', (req, res, next) => {
    console.log("View Sent Mail List Route Hit.");
    req.body.handlerName = 'sentMail';
    req.body.methodName = 'viewSentMail';
    next();
}, sendResponse)

router.post('/composeMail', (req, res, next) => {
    console.log("Sent Mail List Route Hit.");
    req.body.handlerName = 'compose';
    req.body.methodName = 'composeMail';
    next();
}, sendResponse)




module.exports = router