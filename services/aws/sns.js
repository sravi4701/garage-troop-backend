const AWS = require('aws-sdk');
const config = require('config');
const Utils = require('../../utils');

const accesKey = config.get('aws.AWS_ACCESS_KEY');
const secretKey = config.get('aws.AWS_SECRET_KEY');
const region = config.get('aws.AWS_SMS_REGION');

AWS.config.update({
    accessKeyId: accesKey,
    secretAccessKey: secretKey,
    region
});

class SNS {
    async sendMessage(mobileNo, message) {
        if (!Utils.isProd()) {
            return Promise.resolve();
        }
        const sns = new AWS.SNS();
        try {
            const params = {
                Message: message,
                PhoneNumber: mobileNo
            };
            const response = await sns.publish(params).promise();
            console.log(response);
            return response;
        } catch (error) {
            console.log('error', error.message);
            throw error;
        }
    }
}

module.exports = new SNS();
