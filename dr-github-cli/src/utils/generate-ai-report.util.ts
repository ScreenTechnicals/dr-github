import { generateObject } from "ai";
import chalk from "chalk";
import fs from "fs";
import logUpdate from "log-update";
import { z } from "zod";
import { openai } from "../configs/openai.config.js";
import { estimateTokenCount } from "../helpers/estimate-token-count.helper.js";
import { FileSystemItem } from "./index.js";

export type Report = {
  filename: string;
  path: string;
  quality: number;
  issues: number;
  issueTypes: string[];
  suggestions: string;
};

var tpmLength = 0;
var filesChecked = 0;

export const generateAiReport = async (
  contents: FileSystemItem[],
  model: string,
  projectTpm: number,
  maxTpm: number,
  totalFiles: number,
  isTrace: boolean
): Promise<Report[]> => {
  try {
    const report: Report[] = [];
    const conventions = fs.existsSync(".drconventions")
      ? fs.readFileSync(".drconventions", "utf-8")
      : "";

    for (const content of contents) {
      if (
        content.type === "file" &&
        !content.name.match(/\.(png|jpeg|ico)$/i)
      ) {
        const contentTpm = estimateTokenCount(content.content ?? "");
        tpmLength += contentTpm;

        if (contentTpm > maxTpm) {
          if (isTrace) {
            console.log(
              chalk.red(
                `❌ ${content.path} is skipped as it exceeds the token limit`
              )
            );
          }

          report.push({
            filename: content.name,
            path: content.path,
            quality: 0,
            issues: -1,
            issueTypes: ["skiped"],
            suggestions:
              "The file is too large to process. Please split the file into smaller files.",
          });

          continue;
        }

        if (projectTpm > maxTpm) {
          if (tpmLength > maxTpm - 2000) {
            tpmLength = 0;
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }

        const result = await generateObject({
          model: openai((model as string).split(" ")[0]),
          system: conventions?.length
            ? `
           This is a code review system that reviews code quality and provides suggestions to improve code quality and fix bugs or issues and also check the following conventions strictly: \n${conventions}
            `
            : "This is a code review system that reviews code quality and provides suggestions to improve code quality and fix bugs or issues.",
          prompt: `Filename: ${content.name} \nPath: ${content.path}\n \n Content:\n${content.content}`,
          schema: z.object({
            filename: z.string().describe("The name of the file"),
            path: z.string().describe("The path of the file"),
            quality: z
              .number()
              .describe("The quality of the file in a scale of 1-10"),
            issues: z.number().describe("The number of bugs in the file"),
            issueTypes: z
              .array(z.string())
              .describe(
                "The types of issues: 'critical' | 'ui' | 'security' | 'linting' | 'deprecated apis' | 'minor'"
              ),
            suggestions: z
              .string()
              .describe(
                "Suggestions to improve code quality and fix the issues according to the issues to that respective file and provide codes to fix the issues if needed."
              ),
          }),
        });

        if (isTrace) {
          console.log(chalk.green(`✅ ${content.path} checked`));
        } else {
          filesChecked += 1;
          logUpdate("🧐 Files Checked: " + filesChecked + "/" + totalFiles);
        }

        report.push(result.object);
      } else if (content.children) {
        const childReports = await generateAiReport(
          content.children,
          model,
          projectTpm,
          maxTpm,
          totalFiles,
          isTrace
        );
        report.push(...childReports);
      }
    }

    return report;
  } catch (err: any) {
    throw new Error("Failed to generate AI report. " + err.message);
  }
};
