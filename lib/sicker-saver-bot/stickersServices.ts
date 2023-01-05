import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { ReactionSticker } from "./types";

export interface StickerServiceProps {
    stickersDirectoryPath: string,
}

export enum Status {
    Ok,
    Err,
}

export interface SaveStickerResultOk {
    status: Status.Ok
}

export interface SaveStickerResultErr {
    status: Status.Err,
    reason: string,
}

export type SaveStickerResult = SaveStickerResultOk | SaveStickerResultErr;

type StickersMap = Record<ReactionSticker['fileUniqueId'], ReactionSticker>;

export class StickerService {
    public readonly stickersDirectoryPath: string;
    private readonly stickersIndexFilePath: string;
    public readonly stickers: Array<ReactionSticker>;
    public readonly stickersMap: StickersMap;

    constructor(props: StickerServiceProps) {
        this.stickersDirectoryPath = props.stickersDirectoryPath;
        this.stickersIndexFilePath = resolve(props.stickersDirectoryPath, 'stickers.json');
        this.stickers = this.readStickerIndex();
        this.stickersMap = this.generateStickersMap(this.stickers);
    }

    saveSticker(sticker: ReactionSticker): SaveStickerResult {
        if (sticker.fileUniqueId in this.stickersMap) {
            return {
                status: Status.Err,
                reason: `Didn't save because it's a duplicate sticker.`
            }
        }

        this.stickers.push(sticker);
        this.stickersMap[sticker.fileUniqueId] = sticker;
        this.writeStickerIndex();
        return {
            status: Status.Ok,
        }
    }

    readStickerIndex(): Array<ReactionSticker> {
        const text = readFileSync(this.stickersIndexFilePath, { encoding: 'utf8' });
        return JSON.parse(text);
    }

    writeStickerIndex() {
        writeFileSync(this.stickersIndexFilePath, JSON.stringify(this.stickers));
    }

    generateStickersMap(stickers: Array<ReactionSticker>): StickersMap {
        return stickers.reduce((map, sticker) => {
            return {
                ...map,
                [sticker.fileUniqueId]: sticker,
            }
        }, {} as StickersMap)
    }
}
