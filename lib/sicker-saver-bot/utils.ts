import got from "got";

const { createWriteStream } = require("fs");
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);

export async function saveUrlToFile(url: string, filePath: string) {
    const downloadStream = got.stream(url);
    const fileWriterStream = createWriteStream(filePath);

    return await pipeline(downloadStream, fileWriterStream);
}
