export const collections = {
    'сделалдело': '1',
    'радость': '1',
    'боль': '2',
    'пиздец': '3',
}

/**
 * A collection of unassigned stickers
 */
export const UNASSIGNED_COLLECTION_ID = '0';

export interface ReactionSticker {
    // Can be sent. Not unique
    fileId: string;
    // Cannot be sent. Unique
    fileUniqueId: string;
    collectionId: string;
    setName: string;
}
