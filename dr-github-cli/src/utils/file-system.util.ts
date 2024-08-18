import fs from "fs";
import path from "path";
import { checkRestricted } from "../helpers/index.js";

export interface FileSystemItem {
  name: string;
  path: string;
  type: "file" | "directory" | "restricted";
  content?: string;
  children?: FileSystemItem[];
}

const fsPromises = fs.promises;

async function getFileSystemItem(fullPath: string): Promise<FileSystemItem> {
  try {
    const stats = await fsPromises.stat(fullPath);
    const itemName = path.basename(fullPath);
    const restricted = await checkRestricted(fullPath);

    if (restricted) {
      return {
        name: itemName,
        path: "restricted",
        type: "restricted",
        children: [],
      };
    }

    if (stats.isDirectory()) {
      const childrenNames = await fsPromises.readdir(fullPath);
      const childrenPromises = childrenNames.map((childName) =>
        getFileSystemItem(path.join(fullPath, childName))
      );
      const children = await Promise.all(childrenPromises);

      return {
        name: itemName,
        path: fullPath,
        type: "directory",
        children: children,
      };
    } else {
      const content = await fsPromises.readFile(fullPath, "utf-8");
      return {
        name: itemName,
        path: fullPath,
        type: "file",
        content,
      };
    }
  } catch (err: any) {
    console.log(err.message);
    return {
      name: "",
      path: "",
      type: "file",
      content: "",
    };
  }
}

export async function getFileSystemData(
  directory: string
): Promise<FileSystemItem[]> {
  const rootNames = await fsPromises.readdir(directory);
  const rootPromises = rootNames.map((rootName) =>
    getFileSystemItem(path.join(directory, rootName))
  );

  return Promise.all(rootPromises);
}
