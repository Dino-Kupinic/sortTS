import * as fs from "fs/promises";
import * as path from "path";
import {Stats} from "fs";

export async function readDirectory(): Promise<string[] | undefined> {
    try {
        return await fs.readdir(process.cwd());
    } catch (err) {
        console.error(err);
    }
}

async function getFileInfos(filePath: string, details: string): Promise<string | undefined> {
    try {
        const stats: Stats = await fs.stat(filePath);
        switch (details) {
            case "date":
                return stats.mtime.toString();
            case "type":
                const ext: string = path.extname(filePath);
                return ext.slice(1);
            case "size":
                return stats.size.toString();
            default:
                return undefined;
        }
    } catch (err) {
        console.error(err);
    }
}

export function getFileDate(filePath: string): Promise<string | undefined> {
    return getFileInfos(filePath, "date");
}

export function getFileType(filePath: string): Promise<string | undefined> {
    return getFileInfos(filePath, "type");
}
