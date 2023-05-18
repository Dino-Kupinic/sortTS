import chalk from "chalk";
import { getInput } from "./input.js";
import { dir, settings } from "./sort.js";
import boxen from "boxen";
export function quitProgram(response) {
    if (!response) {
        console.log(chalk.bgRedBright("exiting..."));
        process.exit(0);
    }
}
export async function askProceed() {
    return new Promise(async (resolve, reject) => {
        try {
            const decision = await getInput(chalk.redBright("> Continue with these settings? (y/n) \n"));
            resolve(decision);
        }
        catch (err) {
            reject(err);
        }
    });
}
export function displaySettings() {
    const text = chalk.magenta("sort by type: "
        + chalk.whiteBright(settings.sortType !== undefined ? chalk.yellow(settings.sortType) : "false") + "\n") +
        chalk.magenta("sort by date: "
            + chalk.whiteBright(settings.sortDate !== undefined ? chalk.yellow(settings.sortDate) : "false") + "\n") +
        chalk.magenta("sort by size: "
            + chalk.whiteBright(settings.sortSize !== undefined ? chalk.yellow(settings.sortSize) : "false") + "\n") +
        chalk.magenta("sort by alphabet: "
            + chalk.whiteBright(settings.sortAlphabet !== undefined ? chalk.yellow(settings.sortAlphabet) : "false") + "\n") +
        chalk.magenta("directory: " + chalk.magentaBright(process.cwd()));
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
//# sourceMappingURL=utils.js.map