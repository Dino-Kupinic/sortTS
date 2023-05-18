import chalk from "chalk";
import {Settings, SettingsDefaults} from "./model/settings.js";
import {askProceed, displaySettings, quitProgram} from "./utils.js";
import {readDirectory} from "./fileReader.js";

export let dir: string = "";
export let settings: Settings = SettingsDefaults;

export async function sort(dest: string, options: Settings): Promise<void> {
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
        const response: boolean = await askProceed();
        quitProgram(response);
        console.log(chalk.green("\n> sorting current folder..."));

        const files: string[] | undefined = await readDirectory();
        if (files !== undefined) {
            files.forEach(file => {
                console.log(file);
            });
        }

    } catch (err) {
        console.error(err);
    }
}

