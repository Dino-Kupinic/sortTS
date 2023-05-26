import chalk from "chalk";
import { SettingsDefaults } from "./model/settings.js";
import { askOrderOfSorting, askProceedWithSettings, displaySettings, quitProgram } from "./utils.js";
import { createDirectory, getFileDate, getFileSizeInKiloByte, getFileType, moveFileToDir, readDirectory } from "./fileHandler.js";
import { getStringInput } from "./input.js";
export let dir = "";
export let settings = SettingsDefaults;
export async function sort(dest, options) {
    try {
        configureSettings(options, dest);
        displayWelcome();
        displaySettings();
        const responseToContinue = await askProceedWithSettings();
        quitProgram(responseToContinue);
        const orderOfSorting = await askOrderOfSorting();
        if (checkValidOrderOfSorting(orderOfSorting)) {
            console.log("valid");
        }
        else {
            console.log(chalk.redBright("Invalid Order. ")
                + chalk.white("Using default sort: ")
                + chalk.yellowBright("1,2,3,4"));
        }
        await askWhatDateWhenDateTrue();
        displaySortingInProgress();
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
function checkValidOrderOfSorting(orderOfSorting) {
    const regExPattern = new RegExp("^[1-4],[1-4](?:,[1-4])*$");
    return regExPattern.test(orderOfSorting);
}
async function askWhatDateWhenDateTrue() {
    const validAnswers = ["day", "month", "year"];
    if (settings.sortDate) {
        const answer = await getStringInput("What date should be sorted by? day, month or year:");
        if (validAnswers.includes(answer)) {
            return answer;
        }
    }
}
function displaySortingInProgress() {
    console.log(chalk.green("\n> sorting current folder..."));
}
function checkOptionsDefined(opts) {
    return Object.values(opts).some(value => value !== undefined);
}
function convertUndefinedToFalse(opts) {
    Object.entries(opts).forEach(([key, value]) => {
        if (value === undefined) {
            opts[key] = false;
        }
    });
    return opts;
}
function configureSettings(options, dest) {
    if (checkOptionsDefined(options)) {
        settings = convertUndefinedToFalse(options);
    }
    else {
        settings.sortType = true;
    }
    if (dest !== undefined) {
        dir = dest;
    }
}
function displayWelcome() {
    console.log(chalk.cyan("\n> Welcome to sortTS!\n"));
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
async function sortByDate(file, dateDetail) {
    let date = await getFileDate(process.cwd() + "/" + file, dateDetail);
    await console.log(file + " -> /" + date);
    await createDirectory(dir + "/" + date);
    await moveFileToDir(process.cwd() + "/" + file, dir + "/" + date + "/" + file);
}
async function sortByAlphabet(file, dateDetail) {
    let firstLetter = "";
    const regExPattern = new RegExp("[A-Za-z]");
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
const SIZE_50_MB_AS_KB = 50000;
const SIZE_500_MB_AS_KB = 500000;
const SMALL_FILES = "small_files";
const MEDIUM_FILES = "medium_files";
const BIG_FILES = "big_files";
async function sortBySize(file) {
    let size = await getFileSizeInKiloByte(process.cwd() + "/" + file);
    if (size != undefined) {
        let sizeAsNumber = parseInt(size);
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
//# sourceMappingURL=sort.js.map