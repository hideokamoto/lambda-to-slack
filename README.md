# Lambda function posting message to clask

## Getting started

```
$ git clone
$ cd
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
export S3_BUCKET='YOUR_BUCKET'

$ dienv allow
```

## run as local

```
$ npm i -g aws-sam-local
$ sam local invoke PostSlack --event ./event.json
```

## deployment

```
# should run your first deploy
$ aws --profile $AWS_PROFILE s3 mb s3://$S3_BUCKET --region $AWS_REGION

$ ./deploy.sh
```
