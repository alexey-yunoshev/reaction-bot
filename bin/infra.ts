#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';
import { Config } from '../lib/config';

const app = new cdk.App({});
const env = app.node.tryGetContext('env');
if (!env) {
  throw new Error('env is undefined');
}
const account = app.node.tryGetContext('account');
if (!account) {
  throw new Error('account is undefined');
}
const region = app.node.tryGetContext('region');
if (!region) {
  throw new Error('region is undefined');
}
const botToken = app.node.tryGetContext('botToken');
if (!botToken) {
  throw new Error('botToken is undefined');
}
const botWebhookSecretToken = app.node.tryGetContext('botWebhookSecretToken');
if (!botWebhookSecretToken) {
  throw new Error('botWebhookSecretToken is undefined');
}

let config: Config = {
  botToken,
  botWebhookSecretToken,
};

new InfraStack(app, 'InfraStackDev', {
  stackName: `SdelalDeloBot-${env}`,
  env: {
    account,
    region,
  },
  description: 'SdelalDelo Bot Infrastructure',
  config,
});
