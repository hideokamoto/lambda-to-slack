# Lambda function posting message to clask

## Getting started

```
$ git clone git@github.com:hideokamoto/lambda-to-slack.git
$ cd lambda-to-slack
$ npm i
$ cp .envrc.example .envrc
```

### Set env secret

```
$ vim .envrc
export AWS_PROFILE='default'
export AWS_REGION='us-east-1'
export SLACK_TOKEN='xoxa-YOUR_TOKEN'
export SLACK_CHANEL='#random'
export SLACK_CHANEL_DEV='#random'
export S3_BUCKET='YOUR_BUCKET'
export SLACK_PATH='/services/{YOUR_INNCOMING_WEBHOOK_PATH}'
export SLACK_USERNAME='INCOMMINT_WEBHOOK_BOT_NAME'
export STAGE='development'

$ dienv allow
```

## run as local

```
$ npm i -g aws-sam-local

# post by slack app
$ sam local invoke PostSlack --event ./event.json

# post by slack incooming webhook
$ sam local invoke IncommingWebHook --event ./event.json
```

### Event format

```
{
  "slackChanel": "#prod_chanel",
  "slackDevChanel": "#dev_chanel",
  "message": "Test message from Lambda",
  "emoji": ":ghost:"
}
```

## deployment

```
# should run your first deploy
$ aws --profile $AWS_PROFILE s3 mb s3://$S3_BUCKET --region $AWS_REGION

$ ./deploy.sh
```
