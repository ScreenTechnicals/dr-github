import fs from "fs";
import { promisify } from "util";
import { ignore } from "../utils/index.js";

const existsAsync = promisify(fs.exists);
const readFileAsync = promisify(fs.readFile);

export const checkRestricted = async (fullPath: string): Promise<boolean> => {
  try {
    const exists = await existsAsync(".drignore");
    if (!exists) {
      throw new Error("🚫 .drignore file not found! Please add .drignore");
    }

    const filter = await new Promise<any>((resolve, reject) => {
      ignore(".drignore", (err: any, filter: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(filter);
        }
      });
    });

    if (filter === null) {
      throw new Error(
        "🚫 Failed to compile ignore patterns from .drignore file."
      );
    }

    return filter(fullPath);
  } catch (err: any) {
    throw new Error(err.message);
  }
};
