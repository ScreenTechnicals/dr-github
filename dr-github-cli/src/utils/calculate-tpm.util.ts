import { estimateTokenCount } from "../helpers/estimate-token-count.helper.js";
import { FileSystemItem } from "./file-system.util.js";

export const calculateTPM = (contents: FileSystemItem[]): number => {
  let totalTokens = 0;

  const calculateTokensRecursively = (items: FileSystemItem[]) => {
    items.forEach((item: FileSystemItem) => {
      if (item.type === "file" && item.content) {
        const tokenCount = estimateTokenCount(item.content);
        totalTokens += tokenCount;
      } else if (item.type === "directory" && item.children) {
        calculateTokensRecursively(item.children);
      }
    });
  };

  calculateTokensRecursively(contents);

  return totalTokens;
};
