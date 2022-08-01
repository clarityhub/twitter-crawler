import AWS from 'aws-sdk';
import dynamoose from 'dynamoose';

const config: any = {
	httpOptions: {
		connectTimeout: 1000,
	},
	region: 'us-west-2',
};

if (process.env.IS_OFFLINE) {
	config.region = 'us-west-2';
	config.endpoint = 'http://localhost:8000';
	config.accessKeyId = 'DEFAULT_ACCESS_KEY';
	config.secretAccessKey = '';
	// AWS.config.update({ region: 'localhost' });
}

const RawDynamoDB = new AWS.DynamoDB(config);
// const client = new AWS.DynamoDB.DocumentClient(config);

dynamoose.aws.ddb.set(RawDynamoDB);
dynamoose.model.defaults.set({
	create: true,
});

// export default client;
export { dynamoose };