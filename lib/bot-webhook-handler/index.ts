import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Telegraf } from 'telegraf';
import { BotConfiguration } from '../bot/bot-configuration';


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

    const botConfig = new BotConfiguration({
        bot,
    })

    try {
        await botConfig.bot.handleUpdate(JSON.parse(event.body));
    } catch (error) {
        console.error(error);
    }

    return { statusCode: 200 };
}
