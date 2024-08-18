import fs from "fs";
import inquirer from "inquirer";
import logUpdate from "log-update";

const setOpenAiApiKey = async () => {
  const { openAiApiKey } = await inquirer.prompt([
    {
      type: "input",
      name: "openAiApiKey",
      message: "Enter the OpenAI API key:",
      validate: (input) => input.trim() !== "" || "API key is required",
    },
  ]);

  const envContent = fs.existsSync(".env")
    ? fs.readFileSync(".env", "utf-8")
    : "";

  const updatedEnvContent =
    envContent.replace(
      /OPENAI_API_KEY=.*/,
      `OPENAI_API_KEY="${openAiApiKey}"`
    ) || `OPENAI_API_KEY="${openAiApiKey}"\n`;
  fs.writeFileSync(".env", updatedEnvContent);

  console.log("✅ OpenAI API key saved successfully!");
};

const aiModels = ["openai"] as any;

export const setKey = async () => {
  try {
    const { options } = await inquirer.prompt([
      {
        type: "list",
        name: "options",
        message: "Do you want to set the OpenAI API key?",
        choices: aiModels,
        default: "openai",
      },
    ]);

    switch (options) {
      case aiModels[0]:
        setOpenAiApiKey();
        break;
      default:
        console.log("Invalid option Provided!");
        break;
    }
  } catch (err) {
    logUpdate("Failed to set the API key! Please try again.");
  }
};
