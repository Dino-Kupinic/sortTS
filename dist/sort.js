import chalk from "chalk";
import { SettingsDefaults } from "./model/settings.js";
import { askProceed, displaySettings, quitProgram } from "./utils.js";
import { readDirectory } from "./fileReader.js";
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
        const response = await askProceed();
        quitProgram(response);
        console.log(chalk.green("\n> sorting current folder..."));
        const files = await readDirectory();
        if (files !== undefined) {
            files.forEach(file => {
                console.log(file);
            });
        }
    }
    catch (err) {
        console.error(err);
    }
}
//# sourceMappingURL=sort.js.map