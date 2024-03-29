import chalk from "chalk"
import {getBooleanInput, getStringInput} from "./input.js"
import {dir, settings} from "./sort.js"
import boxen from "boxen"

export function quitProgram(response: boolean): void {
  if (!response) {
    console.log(chalk.bgRedBright("exiting..."))
    process.exit(0)
  }
}

export async function askProceedWithSettings(): Promise<boolean> {
  return new Promise(async (resolve, reject): Promise<void> => {
    try {
      const decision: boolean = await getBooleanInput(chalk.redBright("> Continue with these settings? (y/n) \n"))
      resolve(decision)
    } catch (err) {
      reject(err)
    }
  })
}

export async function askOrderOfSorting(): Promise<string> {
  return new Promise(async (resolve, reject): Promise<void> => {
    try {
      const decision: string = await getStringInput(chalk.redBright("> In what order should be sorted?" +
        chalk.white(" e.g.: ") + chalk.yellowBright("\"1,3,4,2\"") + chalk.white(" (quotation marks not needed)\n") +
        chalk.cyan("> The example will first sort by type, then size, then alphabet and then date.\n")))
      resolve(decision)
    } catch (err) {
      reject(err)
    }
  })
}

export function displaySettings(): void {
  const text: string =
    displaySettingsNumber(1) + chalk.magenta("sort by type: "
      + chalk.whiteBright(chalk.yellow(settings.sortType)) + "\n") +
    displaySettingsNumber(2) + chalk.magenta("sort by date: "
      + chalk.whiteBright(chalk.yellow(settings.sortDate)) + "\n") +
    displaySettingsNumber(3) + chalk.magenta("sort by size: "
      + chalk.whiteBright(chalk.yellow(settings.sortSize)) + "\n") +
    displaySettingsNumber(4) + chalk.magenta("sort by alphabet: "
      + chalk.whiteBright(chalk.yellow(settings.sortAlphabet)) + "\n\n") +
    boxen(chalk.magentaBright(process.cwd()), {
      title: chalk.cyanBright("output directory"),
      padding: 0.5,
      titleAlignment: "left",
      borderStyle: "bold",
    })

  console.log(
    boxen(text, {
      title: chalk.cyan("Settings"),
      padding: 0.5,
      titleAlignment: "center",
      borderStyle: "bold",
    }),
  )
}

function displaySettingsNumber(num: number): string {
  return chalk.greenBright("[") + chalk.yellowBright(num) + chalk.greenBright("] ")
}

export function displayComplete(): void {
  console.log(
    boxen(chalk.yellow("Navigate to " + dir + " !"), {
      title: chalk.green("complete!"),
      titleAlignment: "center",
      padding: 0.5,
      borderStyle: "bold",
    }),
  )
}