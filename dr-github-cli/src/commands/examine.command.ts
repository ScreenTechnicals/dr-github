import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";
import {
  calculateTPM,
  generateDrIgnore,
  getLocalContents,
  getRepoContents,
  processContent,
} from "../utils/index.js";

export async function examine(options: Record<string, any>) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        `Please run ${chalk.yellow(
          "`dr-github init`"
        )} to initialize the project first.`
      );
    }

    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "Select the operation",
        choices: ["Examine a GitHub repo", "Examine a local project"] as any,
        default: "Examine a GitHub repo",
      },
    ]);

    if (choice === "Examine a GitHub repo") {
      const { repoUrl } = await inquirer.prompt([
        {
          type: "input",
          name: "repoUrl",
          message: "Enter the GitHub project URL:",
          validate: (input) =>
            input.trim() !== "" || "Repository URL is required",
        },
      ]);

      const projectName = repoUrl.trim().replace(/\/$/, "").split("/").pop();

      const contents = await getRepoContents(repoUrl.trim().replace(/\/$/, ""));

      if (!contents) {
        throw new Error("Failed to retrieve repository contents.");
      }

      const tpm = calculateTPM(contents);
      console.log(`🟢 Total Estimated Tokens: ${tpm}`);

      processContent({
        contents,
        projectName,
        repoUrl: repoUrl.trim().replace(/\/$/, ""),
        projectPath: "./",
        options,
      });
    } else if (choice === "Examine a local project") {
      const { projectPath } = await inquirer.prompt([
        {
          type: "input",
          name: "projectPath",
          message: "Enter the project path:",
          validate: (input) => {
            process.chdir(input);
            return fs.existsSync(input) || "Path does not exist";
          },
          default: "./",
        },
      ]);

      if (!fs.existsSync("./.drignore")) {
        await generateDrIgnore("./");
      }

      const contents = await getLocalContents("./");

      if (!contents) {
        throw new Error("Failed to retrieve local project contents.");
      }

      const tpm = calculateTPM(contents);
      console.log(`🤔 Total Estimated Tokens: ${tpm}`);

      processContent({ contents, projectName: "", projectPath, options });
    }
  } catch (err: any) {
    console.log(err.message);
    console.log(chalk.red("Terminated!"));
  }
}
