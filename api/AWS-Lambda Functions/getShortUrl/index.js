// API ENDPOINT : https://99dk65tgz5.execute-api.us-east-1.amazonaws.com/api/getshorturl
// POST Request JSON format:
// {
//     "longURL":"LONGURL_INPUT"
// } 

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

const md5 = require('md5');

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
        response = await docClient.update(params).promise();
    } catch (error) {
        console.log('Error in fetching counter value from db');
        console.log(error.code);
        console.log(error.statusCode);
        return -1;
    }
    let cnt = response.Attributes.val;
    return cnt;
}

async function insertShortKey(shortKey, longURL) {
    let params = {
        TableName: "urlMapper",
        Item: {
            "shortURLkey": shortKey,
            "longURL": longURL
        }
    };
    let responce;
    try {
        responce = await docClient.put(params).promise();
    } catch (error) {
        console.log('Error in inserting short key');
        console.log(error.code);
        console.log(error.statusCode);
        return -1;
    }
    return 1;
}

async function giveShortKey() {
    let shortKey = '';
    let cnt = await getCounter();
    if (cnt == -1) {
        return '-1';
    }
    //Using very basic technique, 
    //not my main focus as of now
    let md5HashValue = md5(cnt);
    shortKey = md5HashValue.slice(7, 14);

    return shortKey;
}

async function getResponse(longURL) {
    let shortKey = await giveShortKey();
    if (shortKey == '-1') {
        return {
            statusCode: 500,
            shortKey: 'NA',
            msg: 'Internal Server Error, Please try again later'
        };
    }

    let responce = await insertShortKey(shortKey, longURL);
    if (responce == -1) {
        return {
            statusCode: 500,
            shortKey: 'NA',
            msg: 'Internal Server Error, Please try again later'
        };
    }

    return {
        statusCode: 201,
        shortKey: shortKey,
        msg: 'Everything is working successfully'
    };
}

exports.handler = async (event) => {
    let longURL = JSON.parse(event.body).longURL;
    let responce = await getResponse(longURL);
    return {
        body: JSON.stringify(responce)
    };
};
