#!/usr/bin/env node

import { Command } from "commander";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { examine, init, setKey } from "./commands/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const program = new Command();
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8")
  );

  program
    .version(
      `v${packageJson.version}`,
      "-v, --version",
      "output the current version"
    )
    .command("init")
    .description("Initailize dr-github for a project")
    .action(init);

  program
    .command("examine")
    .description("Examine a GitHub repository or a local project")
    .option("-t, --trace", "Show files information")
    .action((options: Record<string, any>) => {
      examine(options);
    });

  program.command("setkey").description("Set the API key").action(setKey);

  program.parse(process.argv);
}

main().catch((err: any) => {
  console.log("Initialization failed:", err);
});
