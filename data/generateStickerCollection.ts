import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { ReactionSticker } from "../lib/sicker-saver-bot/types";

const text = readFileSync(resolve(__dirname, 'stickers.json'), {encoding: 'utf8'});
const stickers = JSON.parse(text) as Array<ReactionSticker>;
const collections: Record<ReactionSticker['collectionId'], Array<ReactionSticker>> = {};

for (const sticker of stickers) {
    if (sticker.collectionId in collections) {
        collections[sticker.collectionId].push(sticker);
    } else {
        collections[sticker.collectionId] = [sticker]
    }
}

const fileContent = `
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT IT MANUALLY.

export const stickerCollections = ${JSON.stringify(collections, null, 2)}`

writeFileSync(resolve(__dirname, 'stickerCollections.ts'), fileContent);