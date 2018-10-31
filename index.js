const getChanel = (prod, dev = '', stage = 'development') => {
  if (!dev) return prod
  return stage === 'production' ? prod : dev
}

const handler = (event, context, callback) => {
  const { WebClient } = require('@slack/client')
  const { SLACK_TOKEN, SLACK_CHANEL, STAGE, SLACK_CHANEL_DEV } = process.env
  if (STAGE !== 'production') console.log('Event: %j', event)
  const slackChanel = event.slackChanel || SLACK_CHANEL
  const slackDevChanel = event.slackDevChanel || SLACK_CHANEL_DEV
  if (!SLACK_TOKEN || !slackChanel) return callback(new Error('slack token or channel is undefined'))
  const { message, attachments } = event
  if (!message) return callback(new Error('Message is undefined.'))

  const web = new WebClient(SLACK_TOKEN)
  const param = {
    channel: getChanel(slackChanel, slackDevChanel, STAGE),
    text: message
  }
  if (attachments) param.attachments = attachments
  web.chat.postMessage(param)
    .then((res) => {
      return callback(null, {
        event,
        result: res.ts
      })
    })
    .catch(error => {
      console.log(error)
      return callback(error)
    })
}

module.exports.handler = handler

const incommingHandler = (event, context, callback) => {
  const { SLACK_PATH, SLACK_CHANEL, SLACK_USERNAME, STAGE, SLACK_CHANEL_DEV } = process.env
  if (STAGE !== 'production') console.log('Event: %j', event)
  const slackChanel = event.slackChanel || SLACK_CHANEL
  const slackDevChanel = event.slackDevChanel || SLACK_CHANEL_DEV
  if (!SLACK_PATH || !slackChanel) return callback(new Error('slack path or channel not defined'))
  const { message, attachments, emoji } = event
  if (!message) return callback(new Error('message not defined.'))
  const username = SLACK_USERNAME || 'slack_bot'
  const postData = {
    channel: getChanel(slackChanel, slackDevChanel, STAGE),
    username,
    text: message,
    icon_emoji: emoji || ':ghost:'
  }
  if (attachments) postData.attachments = attachments
  const options = {
    method: 'POST',
    hostname: 'hooks.slack.com',
    port: 443,
    path: SLACK_PATH
  }
  const https = require('https')
  const utils = require('util')
  const req = https.request(options, res => {
    res.setEncoding('utf8')
    res.on('data', () => callback(null, true))
  })

  req.on('error', e => {
    console.log('problem with request: ' + e.message)
  })

  req.write(utils.format('%j', postData))
  req.end()
}
module.exports.incommingHandler = incommingHandler
