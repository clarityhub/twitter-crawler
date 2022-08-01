# Clarity Hub Twitter Stream Experiment

Crawls Twitter for tesla, microsoft, and amazon tweets.

## Running locally

1. Get [Dynamo for Docker](https://hub.docker.com/r/amazon/dynamodb-local)
2. Run:

```sh
docker run -dp 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb
cd server; npm start

cd client; npm start
```
