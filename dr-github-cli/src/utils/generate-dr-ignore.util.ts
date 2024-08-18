import fs from "fs";
import logUpdate from "log-update";
import path from "path";

export const generateDrIgnore = async (projectPath: string) => {
  try {
    const gitIgnorePath = path.resolve(`${projectPath}.gitignore`);

    if (!fs.existsSync(gitIgnorePath)) {
      throw new Error("🚫 .gitignore file not found! Please add .gitignore");
    }

    const drIgnorePath = path.resolve(".drignore");

    let drIgnoreContent = `
# Ignore all types of images
*.jpg
*.jpeg
*.png
*.gif
*.bmp
*.tiff
*.svg
*.webp
*.ico

# Ignore all types of font files
*.woff
*.woff2
*.eot
*.ttf
*.otf

# Ignore all types of videos and audio files
*.mp3
*.mp4
*.avi
*.flv
*.mov
*.wav
*.webm
*.wmv

# Ignore test files
test.*
*.test.*


# Ignore ignore files
.drignore
.gitignore
.drconventions
.npmignore

.git/
reports/

# Ignore md files
*.md

# Ignore lock files
*.lockb
*.lock
*.lock.*
`.trim();

    if (fs.existsSync(gitIgnorePath)) {
      const gitIgnoreContent = fs.readFileSync(gitIgnorePath, "utf-8");
      const filteredContent = gitIgnoreContent
        .split("\n")
        .filter((line) => line.trim() !== "" && !line.trim().startsWith("#"))
        .join("\n");

      drIgnoreContent += `\n\n# Entries from .gitignore\n${filteredContent}`;
    }

    fs.writeFileSync(drIgnorePath, drIgnoreContent, "utf-8");
    logUpdate("✅ .drignore file created successfully!");
  } catch (err: any) {
    throw new Error(err.message);
  }
};
