import { ReactionSticker } from "../sicker-saver-bot/types";

export enum Flag {
    Off = '0',
    On = '1',
}

export interface StickerMask {
    chatId: string;
    collectionId: string;
    maskValue: Array<Flag>;
}

export type StickerCollections = Record<ReactionSticker['collectionId'], Array<ReactionSticker>>;
