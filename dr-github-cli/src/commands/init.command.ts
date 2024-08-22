import fs from "fs";
import inquirer from "inquirer";
import logUpdate from "log-update";

export async function init() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      const { openAiApiKey } = await inquirer.prompt([
        {
          type: "input",
          name: "openAiApiKey",
          message: "Enter the OpenAI API key:",
          validate: (input) => input.trim() !== "" || "API key is required",
        },
      ]);

      fs.appendFileSync(".env", `\nOPENAI_API_KEY="${openAiApiKey}"\n`);
      console.log("✅ API key saved successfully!\n");
    }

    if (!fs.existsSync("./reports")) {
      fs.mkdirSync("./reports");
    }

    logUpdate(
      "✅ Initialized successfully!\n✨ Run: `dr-github examine` to start"
    );
  } catch (err: any) {
    console.log(err.message);
    console.log("❌ Initialization failed!");
  }
}
