import * as fs from "fs/promises";
import * as path from "path";
/**
 * asynchrounsly creates a directory at given path
 * @param creationPath path where directory should be created
 */
export async function createDirectory(creationPath) {
    try {
        await fs.mkdir(creationPath, { recursive: true });
    }
    catch (err) {
        console.error(err);
    }
}
/**
 * asynchrounsly moves a file to a directory by renaming it.
 * @param filePath path to the file
 * @param directoryPath path to the output directory
 */
export async function moveFileToDir(filePath, directoryPath) {
    try {
        await fs.rename(filePath, directoryPath);
    }
    catch (err) {
        console.error(err);
    }
}
/**
 * Reads a directory and returns an string array containing all files.
 */
export async function readDirectory() {
    try {
        return await fs.readdir(process.cwd());
    }
    catch (err) {
        console.error(err);
    }
}
/**
 * Returns various information about a file.
 * @param filePath path to the file
 * @param details what should be returned
 */
async function getFileInfos(filePath, details) {
    try {
        const stats = await fs.stat(filePath);
        switch (details) {
            case "date":
                return stats.mtime.toString();
            case "type":
                const ext = path.extname(filePath);
                return ext.slice(1);
            case "size":
                return stats.size.toString();
            default:
                return undefined;
        }
    }
    catch (err) {
        console.error(err);
    }
}
/**
 * Returns a string containing a day, month or year.
 * @param filePath path to the file
 * @param detail what detail of a full date should be returned. Possible options: "year", "day" or "month"
 */
export async function getFileDate(filePath, detail) {
    // e.g.:Thu May 18 2023 22:55:17 GMT+0200 (Central European Summer Time)
    const date = await getFileInfos(filePath, "date");
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
export function getFileType(filePathIncludingFile) {
    return getFileInfos(filePathIncludingFile, "type");
}
/**
 * Returns the size of the file in bytes as digits.
 * @param filePathIncludingFile path to the file including the file and filetype (if any)
 */
export function getFileSizeInByte(filePathIncludingFile) {
    return getFileInfos(filePathIncludingFile, "size");
}
/**
 * Returns the size of the file in kilobytes as digits.
 * @param filePathIncludingFile path to the file including the file and filetype (if any)
 */
export async function getFileSizeInKiloByte(filePathIncludingFile) {
    const byteSize = await getFileInfos(filePathIncludingFile, "size");
    if (byteSize != null) {
        return (parseInt(byteSize) / 1000).toString();
    }
    return undefined;
}
//# sourceMappingURL=fileHandler.js.map