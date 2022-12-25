import { aws_lambda as lambda, aws_logs as logs, Stack, StackProps } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';
import { Config } from './config';

export interface InfraStackProps extends StackProps {
  config: Config;
}

export class InfraStack extends Stack {
  private config;
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    this.config = props.config;
    this.createBotWebhookHandler();
  }

  private createBotWebhookHandler() {
    const webhookHandler = new NodejsFunction(this, 'WebhookHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      logRetention: logs.RetentionDays.ONE_DAY,
      entry: path.join(__dirname, 'bot-webhook-handler', 'index.ts'),
      environment: {
        BOT_TOKEN: this.config.botToken,
        BOT_WEBHOOK_SECRET_TOKEN: this.config.botWebhookSecretToken,
      }
    });

    webhookHandler.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
  }
}
