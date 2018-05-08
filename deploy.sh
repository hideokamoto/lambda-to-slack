#!/usr/bin/env bash
aws cloudformation package --template-file ./template.yml --output-template-file template-output.yml --s3-bucket $S3_BUCKET
aws cloudformation deploy \
 --template-file ./template-output.yml --stack-name lambda-slack --capabilities CAPABILITY_IAM --region $AWS_REGION \
 --parameter-overrides SlackToken=$SLACK_TOKEN SlackChanel=$SLACK_CHANEL SlackPath=$SLACK_PATH SlackUsername=$SLACK_USERNAME
