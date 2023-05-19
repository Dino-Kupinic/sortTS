import chalk from "chalk";
import { SettingsDefaults } from "./model/settings.js";
import { askOrderOfSorting, askProceedWithSettings, displaySettings, quitProgram } from "./utils.js";
import { createDirectory, getFileType, moveFileToDir, readDirectory } from "./fileHandler.js";
export let dir = "";
export let settings = SettingsDefaults;
export async function sort(dest, options) {
    if (options !== undefined) {
        settings.sortSize = options.sortSize;
        settings.sortDate = options.sortDate;
        settings.sortAlphabet = options.sortAlphabet;
    }
    if (dest !== undefined) {
        dir = dest;
    }
    console.log(chalk.cyan("\n> Welcome to sortTS!\n"));
    displaySettings();
    try {
        const responseToContinue = await askProceedWithSettings();
        quitProgram(responseToContinue);
        const orderOfSorting = await askOrderOfSorting();
        console.log(orderOfSorting);
        console.log(chalk.green("\n> sorting current folder..."));
        const files = await readDirectory();
        if (files !== undefined) {
            for (const file of files) {
                await sortByType(file);
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}
async function sortByType(file) {
    let type = await getFileType(process.cwd() + "/" + file);
    if (type === "") {
        type = "other";
    }
    await console.log(file + " -> /" + type);
    await createDirectory(dir + "/" + type);
    await moveFileToDir(process.cwd() + "/" + file, dir + "/" + type + "/" + file);
}
//# sourceMappingURL=sort.js.map