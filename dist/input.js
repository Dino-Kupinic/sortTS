import readline from "readline";
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const prompt = (question) => new Promise((resolve) => readLine.question(question, resolve));
export async function getInput(question) {
    return new Promise(async (resolve, reject) => {
        let userDecision = false;
        try {
            const input = await prompt(question);
            userDecision = input.toLowerCase() === "y" || input.toLowerCase() === "n";
            resolve(userDecision);
            readLine.close();
        }
        catch (err) {
            reject(err);
        }
    });
}
//# sourceMappingURL=input.js.map