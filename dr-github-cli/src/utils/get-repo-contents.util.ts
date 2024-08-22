import cliSpinners from "cli-spinners";
import fs from "fs";
import logUpdate from "log-update";
import path from "path";
import simpleGit from "simple-git";
import {
  FileSystemItem,
  generateDrIgnore,
  getFileSystemData,
} from "./index.js";

const fsPromises = fs.promises;

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

    await fsPromises.mkdir(examiningDir, { recursive: true });
    await git.clone(githubProject, repoDir);

    if (!fs.existsSync("./.drignore")) {
      await generateDrIgnore("./");
    }
    const fileSystemData = await getFileSystemData(repoDir);

    await fsPromises.rm(examiningDir, { recursive: true, force: true });

    clearInterval(inerval);
    logUpdate("📦 Repo contents fetched successfully!");

    return fileSystemData;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
