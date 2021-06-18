const express = require('express')
const md5 = require('md5')
const axios = require('axios')
let router = express.Router()

let AWS = require('../config/aws-config')
let docClient = new AWS.DynamoDB.DocumentClient();

async function getCounter() {
    let params = {
        TableName: "urlMapper",
        Key: {
            "shortURLkey": "cnt"
        },
        UpdateExpression: "ADD val :val",
        ExpressionAttributeValues: {
            ":val": 1
        },
        ReturnValues: "UPDATED_NEW"
    };
    let response;
    try {
        response = await docClient.update(params).promise()
    } catch (error) {
        console.log('Error in fetching counter value from db')
        console.log(error.code)
        console.log(error.statusCode)
        return -1
    }
    let cnt = response.Attributes.val
    return cnt
}

async function giveShortKey() {
    let shortKey = ''
    let cnt = await getCounter()
    if (cnt == -1) {
        return '-1'
    }
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
    let response;
    try {
        response = await docClient.put(params).promise()
    } catch (error) {
        console.log('Error in inserting short key')
        console.log(error.code)
        console.log(error.statusCode)
        return -1
    }
    return 1;
}

router.post('/api/getShortUrl', async (req, res) => {
    let longURL = req.body.longUrl
    
    let shortKey = await giveShortKey()
    if (shortKey == '-1') {
        return res.status(500).json({
            'shortUrl': 'NA',
            'msg': 'Internal Server Error, Please try again later'
        });
    }

    let response = await insertShortKey(shortKey, longURL)
    if (response == -1) {
        return res.status(500).json({
            'shortUrl': 'NA',
            'msg': 'Internal Server Error, Please try again later'
        });
    }

    let shortUrl = req.protocol + "://" + req.get('host') + '/' + shortKey
    return res.status(200).json({
        'shortUrl': shortUrl,
        'msg': 'Everything is working successfully'
    });

})

module.exports = router;
