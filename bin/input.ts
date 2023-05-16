import readline from "readline";

const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (question: string) => new Promise((resolve) => readLine.question(question, resolve));

export async function getInput(question: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            const input: string = await prompt(question) as string;
            let userDecision: boolean = input.toLowerCase() === "y";
            resolve(userDecision);
            readLine.close();
        } catch (err) {
            reject(err);
        }
    });
}

