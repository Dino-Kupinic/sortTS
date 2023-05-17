import chalk from "chalk";
import boxen from "boxen";
import {Settings, SettingsDefaults} from "./settings.js";
import {getInput} from "./input.js";

let dir: string = "";
let settings: Settings = SettingsDefaults;

export async function sort(dest: string, options: Settings): Promise<void> {
    if (options !== undefined) {
        settings.sortSize = options.sortSize;
        settings.sortDate = options.sortDate;
        settings.sortAlphabet = options.sortAlphabet;
    }
    console.log(chalk.cyan("\n> Welcome to sortTS!\n"));
    displaySettings();
    try {
        const response: boolean = await askProceed();
        quitProgram(response);
        console.log(chalk.green("\n> sorting current folder..."));
    } catch (err) {
        console.error(err);
    }
}

function quitProgram(response: boolean): void {
    if (!response) {
        console.log(chalk.bgRedBright("exiting..."));
        process.exit(0);
    }
}

async function askProceed(): Promise<boolean> {
    return new Promise(async (resolve, reject): Promise<void> => {
        try {
            const decision: boolean = await getInput(chalk.redBright("> Continue with these settings? (y/n) \n"));
            resolve(decision);
        } catch (err) {
            reject(err);
        }
    });
}

function displaySettings(): void {
    const text: string =
        chalk.magenta("sort by date: "
            + chalk.whiteBright(settings.sortDate !== undefined ? chalk.yellow(settings.sortDate) : "false") + "\n") +
        chalk.magenta("sort by size: "
            + chalk.whiteBright(settings.sortSize !== undefined ? chalk.yellow(settings.sortSize) : "false") + "\n") +
        chalk.magenta("sort by alphabet: "
            + chalk.whiteBright(settings.sortAlphabet !== undefined ? chalk.yellow(settings.sortAlphabet) : "false") + "\n") +
        chalk.magenta("directory: " + chalk.magentaBright(process.cwd()));

    console.log(
        boxen(text, {
            title: chalk.cyan("Settings"),
            padding: 0.5,
            titleAlignment: "center",
            borderStyle: "bold"
        })
    );
}

export function displayComplete(): void {
    console.log(
        boxen(chalk.yellow("Navigate to " + dir + " !"), {
            title: chalk.green("complete!"),
            titleAlignment: "center",
            padding: 0.5,
            borderStyle: "bold"
        })
    );
}