import * as fs from "fs/promises";
import * as path from "path";
import {Stats} from "fs";

export async function createDirectory(creationPath: string): Promise<void> {
    try {
        await fs.mkdir(creationPath, {recursive: true});
    } catch (err) {
        console.error(err);
    }
}

export async function moveFileToDir(filePath: string, directoryPath: string): Promise<void> {
    try {
        await fs.rename(filePath, directoryPath);
    } catch (err) {
        console.error(err);
    }
}

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

export async function getFileDate(filePath: string, detail: string): Promise<string | undefined> {
    // e.g.:Thu May 18 2023 22:55:17 GMT+0200 (Central European Summer Time)
    const date: string | undefined = await getFileInfos(filePath, "date");

    switch (detail) {
        case "year":
            return date?.slice(11, 15);
        case "day":
            return date?.slice(0, 3);
        case "month":
            return date?.slice(4, 7);
    }
    return date;
}

export function getFileType(filePathIncludingFile: string): Promise<string | undefined> {
    return getFileInfos(filePathIncludingFile, "type");
}

