import { DynamoDBClient, GetItemCommand, PutItemCommand, PutItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { Flag, StickerMask } from "./types";

export interface StickerMaskRepositoryProps {
    dynamodb: DynamoDBClient,
    dataTableName: string;
}

const attributeName = {
    stickerMask: {
        id: 'pk',
        value: 'attr1',
    }
}

export class StickerMaskRepository {
    private dynamodb: DynamoDBClient;
    private dataTableName: string;

    constructor(props: StickerMaskRepositoryProps) {
        this.dynamodb = props.dynamodb;
        this.dataTableName = props.dataTableName;
    }

    public async saveMask(mask: StickerMask): Promise<PutItemCommandOutput> {
        return await this.dynamodb.send(new PutItemCommand({
            TableName: this.dataTableName,
            Item: {
                [attributeName.stickerMask.id]: { S: this.buildMaskId(mask) },
                [attributeName.stickerMask.value]: { S: mask.maskValue.join('') },
            },
        }))
    };

    public async getMask(params: Pick<StickerMask, 'chatId' | 'collectionId'>): Promise<StickerMask | null> {
        const response = await this.dynamodb.send(new GetItemCommand({
            TableName: this.dataTableName,
            Key: {
                [attributeName.stickerMask.id]: { S: this.buildMaskId(params) },
            },
        }))

        const item = response.Item;
        if (!item) {
            return null;
        }

        return {
            ...params,
            maskValue: (item[attributeName.stickerMask.value].S || '').split('') as Array<Flag>,
        }
    };

    private buildMaskId(mask: Pick<StickerMask, 'chatId' | 'collectionId'>) {
        return `${mask.chatId}#${mask.collectionId}`;
    }
}