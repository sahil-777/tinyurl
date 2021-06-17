const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

const md5 = require('md5')

exports.handler = async (event, context, callback) => {
    let longURL = 'https://www.sample.com/';
    await createMessage(longURL).then(() => {
        callback(null, {
            statusCode: 201,
            body: JSON.stringify(JSON.parse(event.body))
        });
    }).catch((err) => {
        console.error(err);
    });
};

function createMessage(longURL) {
    let md5HashValue = md5(longURL);
    let shortKey = md5HashValue.slice(0, 7);
    const params = {
        TableName: 'urlMapper',
        Item: {
            'shortURLkey': shortKey,
            'longURL': longURL
        }
    };
    return ddb.put(params).promise();
}
