import chalk from 'chalk';
import boxen from "boxen";
import { SettingsDefaults } from "./settings.js";
let dir = "";
let settings = SettingsDefaults;
export async function sort() {
    console.log(chalk.cyan("\nWelcome to sortTS!") + chalk.green("\n> sorting current folder..."));
    displaySettings();
}
export function displaySettings() {
    const text = chalk.magenta("sort by date: " + chalk.whiteBright(settings.sortDate + "\n")) +
        chalk.magenta("sort by size: " + chalk.whiteBright(settings.sortSize + "\n")) +
        chalk.magenta("sort by alphabet: " + chalk.whiteBright(settings.sortAlphabet));
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