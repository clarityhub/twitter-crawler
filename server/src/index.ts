import "./services/DotEnvLoader";

import Twitter from 'twitter-lite';
import {debug, debugError } from "./services/Logger";
import initServer from "./server";
import AnalyzeTweet from "./jobs/AnalyzeTweet";

if (!process.env.TWITTER_CONSUMER_KEY) {
    debugError("[ROOT] TWITTER_CONSUMER_KEY was not set");
    process.exit(1);
}

if (!process.env.TWITTER_CONSUMER_SECRET) {
    debugError("[ROOT] TWITTER_CONSUMER_SECRET was not set");
    process.exit(1);
}

if (!process.env.TWITTER_TOKEN) {
    debugError("[ROOT] TWITTER_TOKEN was not set");
    process.exit(1);
}

if (!process.env.TWITTER_TOKEN_SECRET) {
    debugError("[ROOT] TWITTER_TOKEN_SECRET was not set");
    process.exit(1);
}

const TRACKERS = ['tesla', 'microsoft', 'amazon'];

const analyzeTweet = new AnalyzeTweet();

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

const parameters = {
    track: TRACKERS,
};

const stream = client.stream("statuses/filter", parameters)
    .on("start", () => debug("[ROOT] Listenting for", TRACKERS))
    .on("data", tweet => {
        TRACKERS.forEach((tracker) => {
            if (tweet.text.toLowerCase().includes(tracker.toLowerCase())) {
                analyzeTweet.process(tracker, tweet);
            }
        });
    })
    .on("error", error => {
        debugError("error", error);
        // Die so we can reconnect
        process.exit(1);
    });


initServer();
