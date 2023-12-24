import * as readline from "readline";
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const prompt = (question) => new Promise((resolve) => readLine.question(question, resolve));
export async function getBooleanInput(question) {
    return new Promise(async (resolve, reject) => {
        try {
            const input = await prompt(question);
            let userDecision = input.toLowerCase() === "y" || input === "";
            resolve(userDecision);
        }
        catch (err) {
            reject(err);
        }
    });
}
export async function getStringInput(question) {
    return new Promise(async (resolve, reject) => {
        try {
            const input = await prompt(question);
            resolve(input);
            readLine.close();
        }
        catch (err) {
            reject(err);
        }
    });
}
//# sourceMappingURL=input.js.map