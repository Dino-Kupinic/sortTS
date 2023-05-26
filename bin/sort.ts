import chalk from "chalk";
import {Settings, SettingsDefaults} from "./model/settings.js";
import {askOrderOfSorting, askProceedWithSettings, displaySettings, quitProgram} from "./utils.js";
import {createDirectory, getFileDate, getFileType, moveFileToDir, readDirectory} from "./fileHandler.js";
import {getStringInput} from "./input.js";

export let dir: string = "";
export let settings: Settings = SettingsDefaults;

export async function sort(dest: string, options: Settings): Promise<void> {
    try {
        configureSettings(options, dest);
        displayWelcome();
        displaySettings();

        const responseToContinue: boolean = await askProceedWithSettings();
        quitProgram(responseToContinue);

        const orderOfSorting: string = await askOrderOfSorting();
        if (checkValidOrderOfSorting(orderOfSorting)) {
            console.log("valid");
        } else {
            console.log(chalk.redBright("Invalid Order. ")
                + chalk.white("Using default sort: ")
                + chalk.yellowBright("1,2,3,4"));
        }


        await askWhatDateWhenDateTrue();

        displaySortingInProgress();

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

function checkValidOrderOfSorting(orderOfSorting: string): boolean {
    const regExPattern: RegExp = new RegExp("^[1-4],[1-4](?:,[1-4])*$");
    return regExPattern.test(orderOfSorting);
}

async function askWhatDateWhenDateTrue(): Promise<string | undefined> {
    const validAnswers: string[] = ["day", "month", "year"];
    if (settings.sortDate) {
        const answer: string = await getStringInput("What date should be sorted by? day, month or year:");
        if (validAnswers.includes(answer)) {
            return answer;
        }
    }
}

function displaySortingInProgress(): void {
    console.log(chalk.green("\n> sorting current folder..."));
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

async function sortByDate(file: string, dateDetail: string): Promise<void> {
    let date: string | undefined = await getFileDate(process.cwd() + "/" + file, dateDetail);
    await console.log(file + " -> /" + date);
    await createDirectory(dir + "/" + date);
    await moveFileToDir(process.cwd() + "/" + file, dir + "/" + date + "/" + file);
}

