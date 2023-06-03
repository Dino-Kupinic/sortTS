import * as fs from "fs/promises";
import * as path from "path";
import {Stats} from "fs";

/**
 * asynchrounsly creates a directory at given path
 * @param creationPath path where directory should be created
 */
export async function createDirectory(creationPath: string): Promise<void> {
    try {
        await fs.mkdir(creationPath, {recursive: true});
    } catch (err) {
        console.error(err);
    }
}

/**
 * asynchronously moves a file to a directory.
 * @param filePath path to the file
 * @param directoryPath path to the output directory
 */
export async function moveFileToDir(filePath: string, directoryPath: string): Promise<void> {
    try {
        await fs.copyFile(filePath, directoryPath);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Reads a directory and returns an string array containing all files.
 */
export async function readDirectory(): Promise<string[] | undefined> {
    try {
        return await fs.readdir(process.cwd());
    } catch (err) {
        console.error(err);
    }
}

/**
 * Returns various information about a file.
 * @param filePath path to the file
 * @param details what should be returned
 */
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

/**
 * Returns a string containing a day, month or year.
 * @param filePath path to the file
 * @param detail what detail of a full date should be returned. Possible options: "year", "day" or "month"
 */
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

/**
 * Returns the type of the file without the dot.
 * @param filePathIncludingFile path to the file including the file and filetype (if any)
 */
export function getFileType(filePathIncludingFile: string): Promise<string | undefined> {
    return getFileInfos(filePathIncludingFile, "type");
}

/**
 * Returns the size of the file in bytes as digits.
 * @param filePathIncludingFile path to the file including the file and filetype (if any)
 */
export function getFileSizeInByte(filePathIncludingFile: string): Promise<string | undefined> {
    return getFileInfos(filePathIncludingFile, "size");
}

/**
 * Returns the size of the file in kilobytes as digits.
 * @param filePathIncludingFile path to the file including the file and filetype (if any)
 */
export async function getFileSizeInKiloByte(filePathIncludingFile: string): Promise<string | undefined> {
    const byteSize: string | undefined = await getFileInfos(filePathIncludingFile, "size");
    if (byteSize != null) {
        return (parseInt(byteSize) / 1000).toString();
    }
    return undefined;
}