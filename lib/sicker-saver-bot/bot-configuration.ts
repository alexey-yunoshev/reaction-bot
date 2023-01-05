import { resolve } from "path";
import { Telegraf } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
import { Status, StickerService } from "./stickersServices";
import { UNASSIGNED_COLLECTION_ID } from "./types";
import { saveUrlToFile } from "./utils";


export interface StickerSaverBotConfigurationProps {
    bot: Telegraf,
    token: string,
    stickerService: StickerService,
}

export class StickerSaverBotConfiguration {
    public bot: Telegraf
    private token: string
    private stickerIndexService: StickerService;

    constructor(props: StickerSaverBotConfigurationProps) {
        this.bot = props.bot;
        this.token = props.token;
        this.stickerIndexService = props.stickerService;
        this.configureBot();
    }

    private configureBot() {
        this.configureMessageHandler();
    }

    private async configureMessageHandler() {
        // @ts-ignore
        this.bot.on('message', async (ctx) => {
            const msg = ctx.message;
            if (!('sticker' in msg)) {
                return;
            }

            const result = await this.saveSticker(msg.sticker);
            if (result.status === Status.Ok) {
                return ctx.reply('Saved sticker', {
                    reply_to_message_id: msg.message_id,
                });
            } else {
                return ctx.reply(result.reason, {
                    reply_to_message_id: msg.message_id,
                });
            }
        });
    }

    private async saveSticker(sticker: Message.StickerMessage['sticker']) {
        const setName = sticker.set_name || '';
        const fileUniqueId = sticker.file_unique_id;
        const fileId = sticker.file_id;
        const result = this.stickerIndexService.saveSticker({
            collectionId: UNASSIGNED_COLLECTION_ID,
            fileId,
            setName,
            fileUniqueId,
        });
        await this.downloadSticker(sticker.file_id);
        return result;
    }

    private async downloadSticker(file_id: string) {
        const file = await this.bot.telegram.getFile(file_id);
        const stickerFilePath = file.file_path;
        if (!stickerFilePath) {
            throw new Error(`file_path for ${file.file_unique_id} is undefined`);
        }
        const downloadLink = this.buildDownloadLink(stickerFilePath);
        const filePath = this.buildStickerFilePath(file.file_unique_id);
        await saveUrlToFile(downloadLink, filePath);
    }

    private buildDownloadLink(filePath: string) {
        return `https://api.telegram.org/file/bot${this.token}/${filePath}`;
    }

    private buildStickerFilePath(fileUniqueId: string): string {
        return resolve(this.stickerIndexService.stickersDirectoryPath, 'files', `${fileUniqueId}.tgs`);
    }
}
