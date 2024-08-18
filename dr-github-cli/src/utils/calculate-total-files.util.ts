import { FileSystemItem } from "./file-system.util.js";

export const calculateTotalFiles = (contents: FileSystemItem[]): number => {
  let files = 0;

  const calculateFilesRecursively = (items: FileSystemItem[]) => {
    items.forEach((item: FileSystemItem) => {
      if (item.type === "file" && item.content) {
        files++;
      } else if (item.type === "directory" && item.children) {
        calculateFilesRecursively(item.children);
      }
    });
  };

  calculateFilesRecursively(contents);

  return files;
};
