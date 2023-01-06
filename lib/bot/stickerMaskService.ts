import { ReactionSticker } from "../sicker-saver-bot/types";
import { StickerMaskRepository } from "./stickerMaskRepository";
import { Flag, StickerCollections, StickerMask } from "./types";

export interface StickerMaskServiceProps {
    stickerMaskRepository: StickerMaskRepository;
    stickerCollections: StickerCollections;
}


type Index = number;
type StickerIndexes = Record<ReactionSticker['fileId'], Index>;

export class StickerMaskService {
    private readonly stickerMaskRepository: StickerMaskRepository;
    private readonly stickerCollections: StickerCollections;
    private readonly stickerIndexes: StickerIndexes;


    constructor(props: StickerMaskServiceProps) {
        this.stickerMaskRepository = props.stickerMaskRepository;
        this.stickerCollections = props.stickerCollections;
        this.stickerIndexes = this.buildStickerIndexes(props.stickerCollections);
    }

    private buildStickerIndexes(collections: StickerCollections): StickerIndexes {
        return Object.values(collections).flatMap((collection) => {
            return collection.map((sticker, index) => ({ fileId: sticker.fileId, index }));
        }).reduce((indexes, { fileId, index }) => {
            return {
                ...indexes,
                [fileId]: index
            }
        }, {} as StickerIndexes)
    }

    public async getMaskOrDefault(params: Pick<StickerMask, 'chatId' | 'collectionId'>): Promise<StickerMask> {
        let mask = await this.stickerMaskRepository.getMask(params);

        if (!mask) {
            mask = this.getDefaultStickerMask(params);
        }

        // If number of stickers in a collection has changed
        if (mask.maskValue.length !== this.getNumberOfStickersInCollection(params.collectionId)) {
            mask.maskValue = this.getDefaultStickerMaskValue(params.collectionId);
        }

        return mask;
    };

    public async updateAndSaveMask(params: {mask: StickerMask, availableStickersCount: number, sticker: ReactionSticker}) {
        const stickerIndex = this.stickerIndexes[params.sticker.fileId];
        let newMask = this.flipBit(params.mask, stickerIndex);
        if (params.availableStickersCount === 1) {
            newMask.maskValue = this.getDefaultStickerMaskValue(params.sticker.collectionId);
            newMask = this.flipBit(newMask, stickerIndex);
        }

        return this.stickerMaskRepository.saveMask(newMask);
    }

    public flipBit(mask: StickerMask, index: number): StickerMask {
        const maskValue = [...mask.maskValue];
        maskValue[index] = maskValue[index] === Flag.On ? Flag.Off : Flag.On;

        return {
            ...mask,
            maskValue,
        }
    }

    private getDefaultStickerMask(params: Pick<StickerMask, 'chatId' | 'collectionId'>): StickerMask {
        return {
            ...params,
            maskValue: this.getDefaultStickerMaskValue(params.collectionId),
        }
    }

    private getDefaultStickerMaskValue(collectionId: StickerMask['collectionId']): Array<Flag> {
        return Array.from((Flag.Off).repeat(this.getNumberOfStickersInCollection(collectionId))) as Array<Flag>
    }

    private getNumberOfStickersInCollection(collectionId: StickerMask['collectionId']): number {
        return this.stickerCollections[collectionId].length;
    }
}