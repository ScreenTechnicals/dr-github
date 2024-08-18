import fs from "fs";
import inquirer from "inquirer";
import logUpdate from "log-update";
import { tpms } from "../common/index.js";
import { calculateTotalFiles } from "./calculate-total-files.util.js";
import { calculateTPM } from "./calculate-tpm.util.js";
import { FileSystemItem } from "./file-system.util.js";
import { generateAiReport } from "./generate-ai-report.util.js";
import { generateReport } from "./generate-report.util.js";

type OpenAiGptModel = {
  name: string;
  value: string;
  tpm: number;
};

const openAiGptModels: OpenAiGptModel[] = [
  {
    name: "gpt-3.5-turbo (200,000 TPM)",
    value: "gpt-3.5-turbo",
    tpm: tpms.gpt35Turbo,
  },
  {
    name: "gpt-4 (10,000 TPM)",
    value: "gpt-4",
    tpm: tpms.gpt4,
  },
  {
    name: "gpt-4o (30,000 TPM)",
    value: "gpt-4o",
    tpm: tpms.gpt4o,
  },
  {
    name: "gpt-4-turbo (30,000 TPM)",
    value: "gpt-4-turbo",
    tpm: tpms.gpt4Turbo,
  },
  {
    name: "gpt-4o-mini (200,000 TPM)",
    value: "gpt-4o-mini",
    tpm: tpms.gpt4oMini,
  },
];

export const processContent = async ({
  contents,
  projectName,
  repoUrl,
  projectPath,
  options,
}: {
  contents: FileSystemItem[];
  projectName: string;
  repoUrl?: string;
  projectPath?: string;
  options?: Record<string, any>;
}) => {
  try {
    if (contents.length === 0) {
      logUpdate("No content found!");

      return;
    }

    const tpm = calculateTPM(contents);
    const totalFiles = calculateTotalFiles(contents);
    const modifiedAvailableModels = openAiGptModels.map((model) => model.name);
    const maxTpm = Math.max(...openAiGptModels.map((model) => model.tpm));
    const isTrace = options?.trace;

    const { model } = await inquirer.prompt([
      {
        type: "list",
        name: "model",
        message: "Select Model:",
        choices: modifiedAvailableModels as any,
        default: "gpt-4o",
      },
    ]);

    logUpdate("Starting to check files...");

    const report = await generateAiReport(
      contents,
      model,
      tpm,
      maxTpm,
      totalFiles,
      isTrace
    );

    if (report) {
      if (!fs.existsSync(`reports/${projectName}`)) {
        fs.mkdirSync(`reports/${projectName}`);
      }
      generateReport(report, projectName, repoUrl, projectPath);
    }
  } catch (err: any) {
    logUpdate(err.message);
  }
};
