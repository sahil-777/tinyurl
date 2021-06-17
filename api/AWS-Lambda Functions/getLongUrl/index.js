// API ENDPOINT: https://99dk65tgz5.execute-api.us-east-1.amazonaws.com/api/getlongurl/{shortKey}
// e.g. : https://99dk65tgz5.execute-api.us-east-1.amazonaws.com/api/getlongurl/6264a30

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

async function fetchUrl(shortKey) {
    if (shortKey == 'favicon.ico' || shortKey == '') {
        return 0; //return domain Address
    }
    let params = {
        TableName: "urlMapper",
        Key: {
            "shortURLkey": shortKey
        }
    };
    let response;
    try {
        response = await docClient.get(params).promise();
    } catch (error) {
        console.log(error.code);
        console.log(error.statusCode);
        return {
            statusCode: 500,
            longUrl: 'NA',
            msg: 'Internal Server Error, Please try again later'
        };
    }
    if (!response || !response.Item) {
        return {
            statusCode: 404,
            longUrl: 'NA',
            msg: 'Page not found'
        };
    } else {
        return {
            statusCode: 200,
            longUrl: response.Item.longURL,
            msg: 'Everything is working, sucessfully'
        };
    }
}

exports.handler = async (event, context, callback) => {
    let shortKey = event.pathParameters.shortkey;
    let responce = await fetchUrl(shortKey);
    return {
        body: JSON.stringify(responce)
    };
};
