#!/usr/bin/env bash
aws cloudformation package --template-file ./template.yml --output-template-file template-output.yml --s3-bucket $S3_BUCKET
aws cloudformation deploy \
 --template-file ./template-output.yml --stack-name lambda-slack --capabilities CAPABILITY_IAM --region us-east-1 \
 --parameter-overrides SlackToken=$SLACK_TOKEN SlackChanel=$SLACK_CHANEL SLACK_PATH=$SLACK_PATH SLACK_USERNAME=$SLACK_USERNAME
