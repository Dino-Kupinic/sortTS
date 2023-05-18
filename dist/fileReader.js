import * as fs from "fs/promises";
export async function readDirectory() {
    try {
        return await fs.readdir(process.cwd());
    }
    catch (err) {
        console.error(err);
    }
}
//# sourceMappingURL=fileReader.js.map