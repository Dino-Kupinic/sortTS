import chalk from "chalk";
import boxen from "boxen";
import { SettingsDefaults } from "./settings.js";
let dir = "";
let settings = SettingsDefaults;
export async function sort(dest, options) {
    if (options !== undefined) {
        settings.sortSize = options.sortSize;
        settings.sortDate = options.sortDate;
        settings.sortAlphabet = options.sortAlphabet;
    }
    console.log(chalk.cyan("\nWelcome to sortTS!") + chalk.green("\n> sorting current folder..."));
    displaySettings();
    await askProceed();
}
export async function askProceed() {
    return new Promise((resolve, reject) => {
    });
}
export function displaySettings() {
    const text = chalk.magenta("sort by date: "
        + chalk.whiteBright(settings.sortDate !== undefined ? settings.sortDate : "false") + "\n") +
        chalk.magenta("sort by size: "
            + chalk.whiteBright(settings.sortSize !== undefined ? settings.sortSize : "false") + "\n") +
        chalk.magenta("sort by alphabet: "
            + chalk.whiteBright(settings.sortAlphabet !== undefined ? settings.sortAlphabet : "false"));
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