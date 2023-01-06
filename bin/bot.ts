import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Telegraf } from "telegraf";
import { stickerCollections } from "../data/stickerCollections";
import { BotConfiguration } from "../lib/bot/bot-configuration";
import { StickerMaskRepository } from "../lib/bot/stickerMaskRepository";
import { StickerMaskService } from "../lib/bot/stickerMaskService";
import { StickerService } from "../lib/bot/stickerService";

const botToken = process.env.BOT_TOKEN!;
const dataTableName = process.env.DATA_TABLE_NAME!;
const region = process.env.AWS_REGION!;
const bot = new Telegraf(botToken);

const dynamodb = new DynamoDBClient({
    region
});
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

console.log('Launching...');
botConfig.bot.launch()
    .then(() => {
        console.log('Bot is listening...')
    });
