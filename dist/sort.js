import chalk from "chalk";
import boxen from "boxen";
import { SettingsDefaults } from "./settings.js";
import { getInput } from "./input.js";
let dir = "";
let settings = SettingsDefaults;
export async function sort(dest, options) {
    if (options !== undefined) {
        settings.sortSize = options.sortSize;
        settings.sortDate = options.sortDate;
        settings.sortAlphabet = options.sortAlphabet;
    }
    console.log(chalk.cyan("\n> Welcome to sortTS!\n"));
    displaySettings();
    try {
        const response = await askProceed();
        if (!response) {
            process.exit(0);
        }
        console.log(chalk.green("\n> sorting current folder..."));
    }
    catch (err) {
        console.error(err);
    }
}
export async function askProceed() {
    return new Promise(async (resolve, reject) => {
        try {
            const decision = await getInput(chalk.redBright("Continue with these settings? (y/n) \n"));
            resolve(decision);
        }
        catch (err) {
            reject(err);
        }
    });
}
export function displaySettings() {
    const text = chalk.magenta("sort by date: "
        + chalk.whiteBright(settings.sortDate !== undefined ? chalk.yellow(settings.sortDate) : "false") + "\n") +
        chalk.magenta("sort by size: "
            + chalk.whiteBright(settings.sortSize !== undefined ? chalk.yellow(settings.sortSize) : "false") + "\n") +
        chalk.magenta("sort by alphabet: "
            + chalk.whiteBright(settings.sortAlphabet !== undefined ? chalk.yellow(settings.sortAlphabet) : "false"));
    console.log(boxen(text, {
        title: chalk.cyan("Settings"),
        padding: 0.5,
        titleAlignment: "center",
        borderStyle: "bold"
    }));
}
export function displayComplete() {
    console.log(boxen(chalk.yellow("Navigate to " + dir + " !"), {
        title: chalk.green("complete!"),
        titleAlignment: "center",
        padding: 0.5,
        borderStyle: "bold"
    }));
}
//# sourceMappingURL=sort.js.map