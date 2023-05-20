#!/usr/bin/env node
import { Command } from "commander";
import { Settings } from "./model/settings.js";
import { sort } from "./sort.js";
import { displayComplete } from "./utils.js";
const program = new Command();
program.name("sort TS")
    .description("simple CLI to sort files into directories based on criteria")
    .version("0.0.1", "-v", "output current version");
program.command("sort")
    .description("used to sort the files of the current directory into a separate directory that contains the sorted files")
    .argument("<destination>", "output destination")
    .option("-s, --size", "sort by size")
    .option("-t, --type", "sort by type")
    .option("-d, --date", "sort by date")
    .option("-a, --alphabet", "sort by alphabet")
    .action(async (dest, options) => {
    const obj = JSON.parse(JSON.stringify(options));
    const opts = new Settings(obj.date, obj.size, obj.alphabet, obj.type);
    try {
        await sort(dest, opts);
        displayComplete();
    }
    catch (err) {
        console.error(err);
    }
});
program.parse();
//# sourceMappingURL=cli.js.map