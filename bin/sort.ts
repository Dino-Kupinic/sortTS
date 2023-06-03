import chalk from "chalk";
import {Settings, SettingsDefaults} from "./model/settings.js";
import {askOrderOfSorting, askProceedWithSettings, displaySettings, quitProgram} from "./utils.js";
import {
    createDirectory,
    getFileDate,
    getFileSizeInKiloByte,
    getFileType,
    moveFileToDir,
    readDirectory
} from "./fileHandler.js";
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

        let orderOfSorting: string = await askOrderOfSorting();
        if (checkValidOrderOfSorting(orderOfSorting)) {
            console.log("valid");
        } else {
            console.log(chalk.redBright("Invalid Order. ")
                + chalk.white("Using default sort: ")
                + chalk.yellowBright("1,2,3,4"));
            orderOfSorting = "1,2,3,4";
        }

        const oof: number[] = [];
        for (let i = 0; i < orderOfSorting.length; i++) {
            if (orderOfSorting[i] === "1" ||
                orderOfSorting[i] === "2" ||
                orderOfSorting[i] === "3" ||
                orderOfSorting[i] === "4") {
                oof.push(parseInt(orderOfSorting[i]));
            }
        }

        const date: string | undefined = await askWhatDateWhenDateTrue();
        displaySortingInProgress();

        const files: string[] | undefined = await readDirectory();
        if (files !== undefined) {
            for (const file of files) {
                for (let i = 0; i < oof.length; i++) {
                    switch (i + 1) {
                        case 1:
                            await sortByType(file);
                            break;
                        case 2:
                            if (date != null) {
                                await sortByDate(file, date);
                            } else {
                                console.log(chalk.redBright("\nInvalid Date!"));
                            }
                            break;
                        case 3:
                            await sortBySize(file);
                            break;
                        case 4:
                            await sortByAlphabet(file);
                            break;
                    }
                }
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

async function sortByAlphabet(file: string): Promise<void> {
    let firstLetter: string = "";
    const regExPattern: RegExp = new RegExp("[A-Za-z]");
    for (let i = 0; i < file.length; i++) {
        if (file[i].match(regExPattern)) {
            firstLetter = file[i];
            break;
        }
    }
    await console.log(file + " -> /" + firstLetter);
    await createDirectory(dir + "/" + firstLetter);
    await moveFileToDir(process.cwd() + "/" + file, dir + "/" + firstLetter + "/" + file);
}

const SIZE_50_MB_AS_KB: number = 50_000;
const SIZE_500_MB_AS_KB: number = 500_000;
const SMALL_FILES: string = "small_files";
const MEDIUM_FILES: string = "medium_files";
const BIG_FILES: string = "big_files";

async function sortBySize(file: string): Promise<void> {
    let size: string | undefined = await getFileSizeInKiloByte(process.cwd() + "/" + file);
    if (size != undefined) {
        let sizeAsNumber: number = parseInt(size);
        switch (true) {
            case sizeAsNumber <= SIZE_50_MB_AS_KB:
                await console.log(file + " -> /" + SMALL_FILES);
                await createDirectory(dir + "/" + SMALL_FILES);
                await moveFileToDir(process.cwd() + "/" + file, dir + "/" + SMALL_FILES + "/" + file);
                break;
            case sizeAsNumber <= SIZE_500_MB_AS_KB:
                await console.log(file + " -> /" + MEDIUM_FILES);
                await createDirectory(dir + "/" + MEDIUM_FILES);
                await moveFileToDir(process.cwd() + "/" + file, dir + "/" + MEDIUM_FILES + "/" + file);
                break;
            default:
                await console.log(file + " -> /" + BIG_FILES);
                await createDirectory(dir + "/" + BIG_FILES);
                await moveFileToDir(process.cwd() + "/" + file, dir + "/" + BIG_FILES + "/" + file);
                break;
        }
    }
}
