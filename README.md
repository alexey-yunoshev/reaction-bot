# Reaction bot
This Telegram bot replies with stickers to messages with certain tags.

## Development
### Local development
1. `npm install`
2. `Bot` VScode launch configuration

## Deployment
```shell
npx cdk deploy -c env=prod -c botToken="some-token" -c botWebhookSecretToken="some-secret"
```