import readline from "readline"

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const prompt = (question: string) => new Promise((resolve) => readLine.question(question, resolve))

export async function getBooleanInput(question: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const input: string = await prompt(question) as string
      let userDecision: boolean = input.toLowerCase() === "y" || input === ""
      resolve(userDecision)

    } catch (err) {
      reject(err)
    }
  })
}

export async function getStringInput(question: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const input: string = await prompt(question) as string
      resolve(input)
      readLine.close()
    } catch (err) {
      reject(err)
    }
  })
}

