// API ENDPOINT: https://99dk65tgz5.execute-api.us-east-1.amazonaws.com/api/getlongurl/{shortKey}
// e.g. : https://99dk65tgz5.execute-api.us-east-1.amazonaws.com/api/getlongurl/6264a30

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

exports.handler = async (event, context, callback) => {
    let shortKey = event.pathParameters.shortkey;
    await fetchUrl(shortKey).then(data => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(data)
        });
    }).catch((err) => {
        console.error(err);
    });
};

function fetchUrl(shortKey) {
    const params = {
        TableName: 'urlMapper',
        Key: {
            "shortURLkey": shortKey
        }
    };
    return ddb.get(params).promise();
}

