import * as fs from "fs/promises";
import * as path from "path";
export async function createDirectory(creationPath) {
    try {
        await fs.mkdir(creationPath, { recursive: true });
    }
    catch (err) {
        console.error(err);
    }
}
export async function moveFileToDir(filePath, directoryPath) {
    try {
        await fs.rename(filePath, directoryPath);
    }
    catch (err) {
        console.error(err);
    }
}
export async function readDirectory() {
    try {
        return await fs.readdir(process.cwd());
    }
    catch (err) {
        console.error(err);
    }
}
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
export function getFileType(filePathIncludingFile) {
    return getFileInfos(filePathIncludingFile, "type");
}
//# sourceMappingURL=fileHandler.js.map