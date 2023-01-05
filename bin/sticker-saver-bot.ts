import { resolve } from "path";
import { Telegraf } from "telegraf";
import { StickerSaverBotConfiguration } from "../lib/sicker-saver-bot/bot-configuration";
import { StickerService } from "../lib/sicker-saver-bot/stickersServices";

const token = process.env.STICKER_SAVER_BOT_TOKEN!;
const bot = new Telegraf(token);
const stickerService = new StickerService({
    stickersDirectoryPath: resolve(__dirname, '..', 'data'),
});


const botConfig = new StickerSaverBotConfiguration({
    bot,
    token: token,
    stickerService,
})

console.log('Launching sticker saver bot...');
botConfig.bot.launch()
    .then(() => {
        console.log('Sticker saver bot is listening...')
    });
