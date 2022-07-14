import AWS from 'aws-sdk'
AWS.config.region = process.env.AWS_REGION
if (process.env.ENV === "local") {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
}

const ddb = new AWS.DynamoDB();
export {ddb};