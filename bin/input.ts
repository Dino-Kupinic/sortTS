import readline from "readline";

const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (question: string) => new Promise((resolve) => readLine.question(question, resolve));

export async function getInput(question: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        let userDecision: boolean = false;
        try {
            const input: string = await prompt(question) as string;
            userDecision = input.toLowerCase() === "y" || input.toLowerCase() === "n";
            resolve(userDecision);
            readLine.close();
        } catch (err) {
            reject(err);
        }
    });
}

