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
        return -1
    }
    if (!response || !response.Item)
        return -1
    else
        return response.Item.longURL
}

router.get('/api/getLongUrl/:shortKey', async (req, res) => {

    let mainAddress = req.protocol + '://' + req.get('host')
    let shortKey = req.params.shortKey
    let longURL = ''

    let longUrlFromDB = await fetchOneByKey(shortKey, mainAddress);
    longURL = longUrlFromDB
    if (longURL == -1) {
        return res.status(500).json({
            'longUrl': 'NA',
            'msg': 'Internal Server Error, Please try again later'
        })
    }

    return res.status(200).json({
        'longUrl': longURL,
        'msg':'Everything is working successfully'
    });
})

module.exports = router;
