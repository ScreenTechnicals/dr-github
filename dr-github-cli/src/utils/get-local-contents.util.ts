import cliSpinners from "cli-spinners";
import fs from "fs";
import logUpdate from "log-update";
import { FileSystemItem, getFileSystemData } from "./index.js";

export const getLocalContents = async (
  url: string
): Promise<FileSystemItem[]> => {
  try {
    if (!url) {
      throw new Error("Invalid github project URL");
    }

    if (!fs.existsSync(".drignore")) {
      throw new Error("🚫 .drignore file not found! Please add .drignore");
    }

    const spinner = cliSpinners["line"];
    let index = 0;

    const inerval = setInterval(() => {
      const { frames } = spinner;
      logUpdate(
        frames[(index = ++index % frames.length)] + " Fetching Contents"
      );
    }, spinner.interval);

    return new Promise(async (resolve, reject) => {
      const fileSystemData = await getFileSystemData(url);
      clearInterval(inerval);
      logUpdate("📦 Local contents fetched successfully!");
      resolve(fileSystemData);
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};
