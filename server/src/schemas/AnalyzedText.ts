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
    raw: String,
    lookupId: String,
    utterance: String,
    embedding: Array,
    sentimentScore: Number,
    sentimentVote: String,
    toxicity: Boolean,
}, {
    timestamps: true,
    saveUnknown: true,
});

const model = dynamoose.model('CHAPI-AnalyzedText', schema, {
    "create": true,
    // @ts-ignore
    throughput: "ON_DEMAND"
});

export { schema, model }

export interface IAnalyzedText {
    source: string,
    date: number,
    raw: string,
    lookupId: string,
    utterance: string,
    embedding: any,
    sentimentScore: number,
    sentimentVote: string,
    toxicity: boolean,
};