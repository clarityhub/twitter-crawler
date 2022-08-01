import requestPromise from "request-promise";

export default class ClarityHub {
    async sentiment(text: string) {
        const response = await requestPromise({
            uri: 'https://api.clarityhub.io/nlp/sentiment',
            method: 'post',
            json: true,
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                user: process.env.CLARITY_HUB_ACCESS_KEY_ID,
                password: process.env.CLARITY_HUB_ACCESS_KEY_SECRET,
            },
            body: {
                "utterances": [text],
            },
        });

        return response.items[0];
    }

    async toxicity(text: string) {
        const response = await requestPromise({
            uri: 'https://api.clarityhub.io/nlp/toxicity',
            method: 'post',
            json: true,
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                user: process.env.CLARITY_HUB_ACCESS_KEY_ID,
                password: process.env.CLARITY_HUB_ACCESS_KEY_SECRET,
            },
            body: {
                "utterances": [text],
            },
        });

        return response.items[0];
    }

    async embed(text: string) {
        try {
            const response = await requestPromise({
                uri: 'https://api.clarityhub.io/nlp/embed',
                method: 'post',
                json: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                auth: {
                    user: process.env.CLARITY_HUB_ACCESS_KEY_ID,
                    password: process.env.CLARITY_HUB_ACCESS_KEY_SECRET,
                },
                body: {
                    "utterances": [text],
                },
            });
    
            return response.items[0];
        } catch (e) {
            return null;
        }
    }
}