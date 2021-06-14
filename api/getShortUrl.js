const express = require('express')
const md5 = require('md5')
let router = express.Router()

let AWS = require('../config/aws-config')
let docClient = new AWS.DynamoDB.DocumentClient();

async function getCounter() {
    let params = {
        TableName: "urlMapper",
        Key: {
            "shortURLkey": "1cnt"
        },
        UpdateExpression: "ADD val :val",
        ExpressionAttributeValues: {
            ":val": 1
        },
        ReturnValues: "UPDATED_NEW"
    };
    let response = await docClient.update(params).promise();
    let cnt = response.Attributes.val
    return cnt
}

async function giveShortKey() {
    let shortKey = ''
    let cnt = await getCounter()
    
    //Using very basic technique, 
    //not my main focus as of now
    let md5HashValue = md5(cnt)
    shortKey = md5HashValue.slice(0, 7);

    return shortKey
}

async function insertShortKey(shortKey, longURL) {
    let params = {
        TableName: "urlMapper",
        Item: {
            "shortURLkey": shortKey,
            "longURL": longURL
        }
    };
    docClient.put(params).promise();
}

router.post('/api/getShortUrl', async (req, res) => {
    let longURL = req.body.longUrl

    let shortKey = await giveShortKey()
    insertShortKey(shortKey, longURL)

    let shortUrl = req.protocol + "://" + req.get('host') + '/' + shortKey
    return res.status(200).json({
        'shortUrl': shortUrl,
    });
})

module.exports = router;
