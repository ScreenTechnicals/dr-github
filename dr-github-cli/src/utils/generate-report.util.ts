import chalk from "chalk";
import fs from "fs";
import { ExternalLinks } from "../common/constants.common.js";
import { Report } from "./generate-ai-report.util.js";

function generateMarkdown(
  report: Report[],
  projectName: string,
  repoUrl?: string
): string {
  const datetime = new Date().toLocaleString();

  let markdown = `# Project Report\n\n #### Generated on: ${datetime}\n\n---\n\n`;

  report.forEach((file) => {
    const filename = repoUrl ? file.path.split(projectName)[1] : file.path;
    const filePath = repoUrl
      ? `${repoUrl}/blob/main${file.path.split(projectName)[1]}`
      : file.path;

    markdown += `## ${file.filename}\n\n`;
    markdown += `**Path**: [${filename}](${filePath})\n\n`;
    markdown += `**Quality**: ${file.quality}\n\n`;
    markdown += `**Issues**: ${file.issues}\n\n`;
    markdown += `**IssueTypes**: ${file.issueTypes}\n\n`;
    markdown += `**Suggestions**:\n${file.suggestions}\n\n`;
  });

  markdown += `\n\n
  ## Copyright\n\n
  Copyright (c) 2024 Chinmaya Sa. All rights reserved.

  Dr. Github is a CLI tool that examines projects from local directories or GitHub repositories using AI. 

  This software is licensed under the MIT. See the LICENSE file for details.

  For more information, visit [https://www.npmjs.com/package/dr-github](https://www.npmjs.com/package/dr-github).
  `;

  return markdown;
}

export const generateReport = (
  report: Report[],
  projectName: string,
  repoUrl?: string,
  projectPath?: string
) => {
  try {
    const markdownContent = generateMarkdown(report, projectName, repoUrl);

    const readmePath = `./reports/${projectName}/DR_GITHUB.md`;
    const jsonPath = `./reports/${projectName}/ai-report.json`;

    fs.writeFileSync(readmePath, markdownContent, "utf-8");
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

    console.log(chalk.green("AI Reports generated successfully 🚀"));
    console.log(
      "Reports saved at " +
        chalk.blue(
          `${
            projectPath?.endsWith("/") ? projectPath : projectPath + "/"
          }reports`
        )
    );
    console.log(
      `Visualize the ai-report.json at ${chalk.yellow(ExternalLinks.website)}`
    );
  } catch (err) {
    console.log("Error generating report:", err);
  }
};
