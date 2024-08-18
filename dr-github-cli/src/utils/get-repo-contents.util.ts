import cliSpinners from "cli-spinners";
import fs from "fs/promises";
import logUpdate from "log-update";
import path from "path";
import simpleGit from "simple-git";
import {
  FileSystemItem,
  generateDrIgnore,
  getFileSystemData,
} from "./index.js";

export const getRepoContents = async (
  url: string
): Promise<FileSystemItem[]> => {
  try {
    const git = simpleGit();
    const githubProject = url;
    const dirName = githubProject.split("/").pop();

    if (!dirName) {
      throw new Error("Invalid github project URL");
    }

    const spinner = cliSpinners["line"];
    let index = 0;

    const inerval = setInterval(() => {
      const { frames } = spinner;
      logUpdate(
        frames[(index = ++index % frames.length)] + " Fetching Contents"
      );
    }, spinner.interval);

    const examiningDir = path.resolve("./examining");
    const repoDir = path.join(examiningDir, dirName);

    await fs.mkdir(examiningDir, { recursive: true });
    await git.clone(githubProject, repoDir);

    await generateDrIgnore(`./examining/${dirName}/`);
    const fileSystemData = await getFileSystemData(repoDir);

    await fs.rm(examiningDir, { recursive: true, force: true });

    clearInterval(inerval);
    logUpdate("📦 Repo contents fetched successfully!");

    return fileSystemData;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
