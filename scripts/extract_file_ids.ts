import { readFileSync } from 'fs';
import { resolve } from 'path';

const data = readFileSync(resolve(__dirname, 'data'), {
    encoding: 'utf-8',
});

type Message = {
    message: {
        sticker: {
            file_id: string,
        }
    }
}
let currentMessageJson = '';


const lines = data.split('\n')
    // .map((line) => line.trim())
const items = [
    '['
];

for (const line of lines) {
    if (line.startsWith('Telegram Bot Raw')) {
        items.push(',')
    } else {
        items.push(line)
    }
}
items.push(']')
let messages: Array<Message> = JSON.parse(items.join(''));
console.log(messages);
const fileIds: Array<string> = [];

for (const message of messages) {
    fileIds.push(message['message']['sticker']['file_id']);
}

console.log(JSON.stringify(fileIds, null, 2));
