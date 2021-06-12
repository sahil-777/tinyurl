const express = require('express')
let router = express.Router()

let AWS = require('../config/aws-config')
let docClient = new AWS.DynamoDB.DocumentClient();

async function fetchOneByKey(shortKey,mainAddress) {
    if (shortKey == 'favicon.ico') {
        return mainAddress
    }
    let params = {
        TableName: "urlMapper",
        Key: {
            "shortURLkey": shortKey
        }
    };
    let s;
    try {
        s = await docClient.get(params).promise()
    } catch (error) {
        console.log(error.code)
        console.log(error.statusCode)
        //return link to error page with status code & appropriate msg
    }
    if (!s || !s.Item)
        return
    else
        return s.Item.longURL
}

router.get('/api/getLongUrl/:shortKey', async (req, res) => {

    let mainAddress = req.protocol + '://' + req.get('host')
    let shortKey = req.params.shortKey
    let longUrlFromDB = await fetchOneByKey(shortKey,mainAddress);
    let longUrl = (longUrlFromDB ? longUrlFromDB : 'linkToErrorPage')
    console.log('\n\n')
    console.log('shortKey =>', shortKey)
    console.log('longURL =>', longUrl)
    return res.status(200).json({
        'longUrl': longUrl
    });
})

module.exports = router;
