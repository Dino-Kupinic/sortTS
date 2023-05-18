import chalk from "chalk";
import {Settings, SettingsDefaults} from "./model/settings.js";
import {askProceed, displaySettings, quitProgram} from "./utils.js";
import {createDirectory, getFileType, moveFileToDir, readDirectory} from "./fileHandler.js";

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
            for (const file of files) {
                await sortByType(file);
            }
        }

    } catch (err) {
        console.error(err);
    }
}

async function sortByType(file: string) {
    let type: string | undefined = await getFileType(process.cwd() + "/" + file);
    if (type === "") {
        type = "other";
    }
    await console.log(file + " -> /" + type);
    await createDirectory(dir + "/" + type);
    await moveFileToDir(process.cwd() + "/" + file, dir + "/" + type + "/" + file);
}

