import { Context, Telegraf } from "telegraf";
import { MessageEntity } from "telegraf/typings/core/types/typegram";
import { hashtagCollectionMap } from "../sicker-saver-bot/types";
import { StickerService } from "./stickerService";

export interface BotConfigurationProps {
    bot: Telegraf
    stickerService: StickerService,
}

const availableHashtags = new Set(Object.keys(hashtagCollectionMap));

export class BotConfiguration {
    public bot: Telegraf
    private stickerService: StickerService;

    constructor(props: BotConfigurationProps) {
        this.bot = props.bot;
        this.stickerService = props.stickerService;
        this.configureBot();
    }

    private configureBot() {
        this.configureMessageHandler();
    }

    private getMessageEntities(message: Context['message']): Array<MessageEntity> {
        const entities = (message && ('entities' in message)) ? (message.entities || []) : [];
        const captionEntitites = (message && ('caption_entities' in message)) ? (message.caption_entities || []) : [];
        return [
            ...entities,
            ...captionEntitites,
        ]
    }

    private getMessageText(message: Context['message']): string | undefined {
        if (!message) {
            return '';
        }

        if ('text' in message) {
            return message.text;
        }

        if ('caption' in message) {
            return message.caption || '';
        }

        return '';
    }

    private async configureMessageHandler() {
        // @ts-ignore
        this.bot.on('message', async (ctx) => {
            const msg = ctx.message;
            const text = this.getMessageText(msg);
            const entities = this.getMessageEntities(msg);
            for (const entity of entities) {
                if (entity.type === "hashtag") {
                    const hashtag = text?.slice(entity.offset + 1, entity.offset + entity.length);
                    if (hashtag && availableHashtags.has(hashtag)) {
                        const sticker = await this.stickerService.getRandomSticker({
                            chatId: msg.chat.id.toString(),
                            hashtag,
                        });

                        return await ctx.replyWithSticker(sticker.fileId, {
                            reply_to_message_id: msg.message_id,
                            disable_notification: true,
                        });
                    }
                }
            }
        });
    }
}
