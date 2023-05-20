import chalk from "chalk";
import {Settings, SettingsDefaults} from "./model/settings.js";
import {askOrderOfSorting, askProceedWithSettings, displaySettings, quitProgram} from "./utils.js";
import {createDirectory, getFileType, moveFileToDir, readDirectory} from "./fileHandler.js";

export let dir: string = "";
export let settings: Settings = SettingsDefaults;

export async function sort(dest: string, options: Settings): Promise<void> {
    configureSettings(options, dest);
    displayWelcome();
    displaySettings();
    try {
        const responseToContinue: boolean = await askProceedWithSettings();
        quitProgram(responseToContinue);

        const orderOfSorting: string = await askOrderOfSorting();
        console.log(orderOfSorting);
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

function checkOptionsDefined(opts: Settings): boolean {
    return Object.values(opts).some(value => value !== undefined);
}

function convertUndefinedToFalse(opts: Settings): Settings {
    Object.entries(opts).forEach(([key, value]) => {
        if (value === undefined) {
            opts[key as keyof Settings] = false;
        }
    });
    return opts;
}

function configureSettings(options: Settings, dest: string): void {
    if (checkOptionsDefined(options)) {
        settings = convertUndefinedToFalse(options);
    } else {
        settings.sortType = true;
    }
    if (dest !== undefined) {
        dir = dest;
    }
}

function displayWelcome(): void {
    console.log(chalk.cyan("\n> Welcome to sortTS!\n"));
}

async function sortByType(file: string): Promise<void> {
    let type: string | undefined = await getFileType(process.cwd() + "/" + file);
    if (type === "") {
        type = "other";
    }
    await console.log(file + " -> /" + type);
    await createDirectory(dir + "/" + type);
    await moveFileToDir(process.cwd() + "/" + file, dir + "/" + type + "/" + file);
}

