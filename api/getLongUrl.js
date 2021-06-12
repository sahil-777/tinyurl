const express = require('express')
let router = express.Router()

let AWS = require('../config/aws-config')
let docClient = new AWS.DynamoDB.DocumentClient();

async function fetchOneByKey(shortKey, mainAddress) {
    if (shortKey == 'favicon.ico' || shortKey == '') {
        return mainAddress
    }
    let params = {
        TableName: "urlMapper",
        Key: {
            "shortURLkey": shortKey
        }
    };
    let response;
    try {
        response = await docClient.get(params).promise()
    } catch (error) {
        console.log(error.code)
        console.log(error.statusCode)
        return mainAddress + '/msg/error'
    }
    if (!response || !response.Item)
        return mainAddress + '/msg/error'
    else
        return response.Item.longURL
}

router.get('/api/getLongUrl/:shortKey', async (req, res) => {

    let mainAddress = req.protocol + '://' + req.get('host')
    let shortKey = req.params.shortKey
    let longURL = ''
    try {
        let longUrlFromDB = await fetchOneByKey(shortKey, mainAddress);
        longURL = longUrlFromDB
    } catch (error) {
        longURL = mainAddress + '/msg/error'
    }

    return res.status(200).json({
        'longUrl': longURL
    });
})

module.exports = router;
