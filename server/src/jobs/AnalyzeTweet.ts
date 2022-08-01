import stats from "stats-lite";
import ClarityHub from "../services/ClarityHub";
import { debug, debugError } from "../services/Logger";
import { model as analyzedText, IAnalyzedText } from "../schemas/AnalyzedText";
import { model as averageText, IAverageText } from "../schemas/AverageText";

const WINDOW_SIZE = 10;

export default class AnalyzeTweet {
    private acc;

    constructor() {
        this.acc = [];
    }

    async process(topic: string, tweet: any) {
        const ch = new ClarityHub();

        const text: string = tweet.text as string;

        try {
            const [sentiment, toxicity, embed] = await Promise.all([
                ch.sentiment(text),
                ch.toxicity(text),
                ch.embed(text)
            ]);

            debug('[AnalyzeTweet] procesing', topic);

            const createdAt = +new Date(tweet.created_at);
            const uniqueId = tweet.id_str.slice(tweet.id_str.length - 4);

            const analyzed: IAnalyzedText = {
                source: `twitter:${topic}`,
                date: parseInt(`${createdAt}${uniqueId}`, 10),
                raw: JSON.stringify(tweet),
                lookupId: tweet.id_str,
                utterance: text,
                embedding: embed?.embedding ?? [],
                sentimentScore: sentiment.comparative,
                sentimentVote: sentiment.vote,
                toxicity: toxicity.labels.toxicity,
            };

            await analyzedText.batchPut([analyzed]);

            this.acc.push(analyzed);

            // Compute last 1000 average
            if (this.acc.length >= WINDOW_SIZE) {
                const sentimentScores = this.acc.map(entry => entry.sentimentScore);
                const toxicityScores = this.acc.map(entry => entry.toxicity ? 1 : 0);

                const sentimentScoresMean = stats.mean(sentimentScores);
                const sentimentScoresVariance = stats.variance(sentimentScores);

                const toxicityPercentage = stats.mean(toxicityScores);

                const averaged: IAverageText = {
                    source: `twitter:${topic}`,
                    date: +new Date(),
                    sentimentScoresMean,
                    sentimentScoresVariance,
                    toxicityPercentage,
                };

                await averageText.batchPut([averaged]);

                // reset acc
                this.acc = [];
            }
        } catch (e) {
            debugError('[AnalyzeTweet] error', e);
        }
    }
}