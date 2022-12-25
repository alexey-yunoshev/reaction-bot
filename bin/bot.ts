import { Telegraf } from "telegraf";
import { BotConfiguration } from "../lib/bot/bot-configuration";

const botToken = process.env.BOT_TOKEN!;
const bot = new Telegraf(botToken);


const botConfig = new BotConfiguration({
    bot,
})

console.log('Launching...');
botConfig.bot.launch()
    .then(() => {
        console.log('Bot is listening...')
    });
