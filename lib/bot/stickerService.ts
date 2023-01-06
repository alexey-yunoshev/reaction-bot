import { hashtagCollectionMap, ReactionSticker } from "../sicker-saver-bot/types";
import { StickerMaskService } from "./stickerMaskService";
import { Flag, StickerCollections } from "./types";

export interface StickerServiceProps {
    stickerMaskService: StickerMaskService;
    stickerCollections: StickerCollections;

}

export class StickerService {
    private readonly stickerMaskService: StickerMaskService;
    private readonly stickerCollections: StickerCollections;

    constructor(props: StickerServiceProps) {
        this.stickerMaskService = props.stickerMaskService;
        this.stickerCollections = props.stickerCollections;
    }

    public async getRandomSticker(params: {
        chatId: string,
        hashtag: string,
    }): Promise<ReactionSticker> {
        const collectionId = this.getCollectionIdByHashtag(params.hashtag);
        const collection = this.stickerCollections[collectionId];
        const mask = await this.stickerMaskService.getMaskOrDefault({
            chatId: params.chatId,
            collectionId,
        });

        const availableStickers = collection.filter((_sticker, index) => mask.maskValue[index] === Flag.Off)
        const sticker = availableStickers[Math.floor(Math.random() * availableStickers.length)];
        await this.stickerMaskService.updateAndSaveMask({
            mask,
            availableStickersCount: availableStickers.length,
            sticker,
        });

        return sticker;
    }

    private getCollectionIdByHashtag(hashtag: string): string {
        return hashtagCollectionMap[hashtag];
    }
}