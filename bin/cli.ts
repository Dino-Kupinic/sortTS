#!/usr/bin/env node

import {Command} from "commander";
import {displayComplete, sort} from "./sort.js";

const program = new Command();

program
    .name("sort TS")
    .description("simple CLI to sort files into directories based on criteria")
    .version("0.0.1", "-v", "output current version")

program
    .command("sort <destination>")
    .description("used to sort the files of the current directory into a separate directory that contains the sorted files")
    .action(await sort().then(() => displayComplete))


program.parse(process.argv);

const options = program.opts();


