import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Telegraf } from 'telegraf';
import { stickerCollections } from '../../data/stickerCollections';
import { BotConfiguration } from '../bot/bot-configuration';
import { StickerMaskRepository } from '../bot/stickerMaskRepository';
import { StickerMaskService } from '../bot/stickerMaskService';
import { StickerService } from '../bot/stickerService';


const bot = new Telegraf(process.env.BOT_TOKEN!);
const secretToken = process.env.BOT_WEBHOOK_SECRET_TOKEN;

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    // if (event.headers['X-Telegram-Bot-Api-Secret-Token'] !== secretToken) {
    //     return { statusCode: 403, body: 'Forbidden' };
    // }

    if (!event.body) {
        return {
            statusCode: 403, body: JSON.stringify({
                "error": "Body is undefined."
            })
        };
    }

    const dataTableName = process.env.DATA_TABLE_NAME;
    if (!dataTableName) {
        throw new Error(`process.env.DATA_TABLE_NAME is undefined`);
    }

    const dynamodb = new DynamoDBClient({});
    const stickerMaskRepository = new StickerMaskRepository({
        dataTableName,
        dynamodb
    });
    const stickerMaskService = new StickerMaskService({
        stickerCollections,
        stickerMaskRepository,
    })
    const stickerService = new StickerService({
        stickerCollections,
        stickerMaskService,
    });
    const botConfig = new BotConfiguration({
        bot,
        stickerService
    })

    try {
        await botConfig.bot.handleUpdate(JSON.parse(event.body));
    } catch (error) {
        console.error(error);
    }

    return { statusCode: 200 };
}
