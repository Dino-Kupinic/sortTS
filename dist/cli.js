#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const sort_1 = require("./sort");
const program = new commander_1.Command();
program
    .name("sort TS")
    .description("simple CLI to sort files into directories based on criteria")
    .version("0.0.1", "-v", "output current version");
program
    .command("sort <destination>")
    .description("used to sort the files of the current directory into a separate directory that contains the sorted files")
    .action(sort_1.sort);
program.parse(process.argv);
const options = program.opts();
//# sourceMappingURL=cli.js.map