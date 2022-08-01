import { dynamoose } from '../services/DynamoDB';

const schema = new dynamoose.Schema({
    source: {
        type: String,
        hashKey: true,
    },
    date: {
        type: Number,
        rangeKey: true,
    },
    sentimentScoresMean: Number,
    sentimentScoresVariance: Number,
    toxicityPercentage: Number,
}, {
    timestamps: true,
    saveUnknown: true,
});

const model = dynamoose.model('CHAPI-AverageText', schema, {
    "create": true,
    // @ts-ignore
    throughput: "ON_DEMAND"
});

export { schema, model }

export interface IAverageText {
    source: string,
    date: number,
    sentimentScoresMean: number,
    sentimentScoresVariance: number,
    toxicityPercentage: number,
};