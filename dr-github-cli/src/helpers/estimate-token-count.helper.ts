// Source-1: https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
// Source-2: https://platform.openai.com/docs/guides/rate-limits/usage-tiers?context=tier-one

export const estimateTokenCount = (text: string): number => {
  const tokenToCharRatio = 4;
  const numChars = text.length;
  const estimatedTokens = Math.ceil(numChars / tokenToCharRatio);

  return estimatedTokens;
};
