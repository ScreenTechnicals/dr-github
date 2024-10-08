# Dr. GitHub ✨

![DALL·E 2024-08-12 15 37 36 - An illustration of a 'Dr  Github' character as a fusion of a friendly doctor and the GitHub logo  The doctor is wearing a white lab coat with a GitHub](https://github.com/user-attachments/assets/e84cd8cc-c256-425c-984e-b4ca9de9de8c)

**Dr. GitHub** is an advanced tool designed to analyze your project repository—whether locally or via a repository URL—and generate a comprehensive report. This report can be visualized on our [web interface](https://dr-github.devverse.io), providing insightful data on code quality, project structure, and other critical metrics.

## Table of Contents 📜

- [Introduction](#introduction)
- [NPM](#npm)
- [Repository Structure](#repository-structure)
- [Setup Instructions](#setup-instructions)
- [Contribution Guidelines](#contribution-guidelines)
- [Raise a Issue](#raise-a-issue)
- [License Information](#license-information)

## Introduction 🚀

The Dr. GitHub monorepo hosts multiple projects that work in tandem to deliver a seamless experience, from command-line interface tools to a web-based visualizer. Each project within this monorepo is developed and maintained independently.

### Projects

- **dr-github-cli**: The command-line interface (CLI) tool that contains all logic required for local or remote repository examination.
- **dr-github-web**: A web-based visualizer built with Next.js, offering an intuitive interface for viewing and interpreting the reports generated by the CLI tool.

## NPM Package

[![npm version](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://npmjs.org/package/dr-github)

## Repository Structure 😎

```plaintext
/
├── dr-github-cli/           # CLI tool directory
│   ├── src/                 # Core logic resides here
│   │   ├── commands/        # Command definitions
│   │   ├── utils/           # Utility functions
│   │   ├── helpers/         # Helper functions
│   │   ├── common/          # Common constants and types
│   │   └── configs/         # Configuration files
│   ├── package.json         # Project dependencies
│   ├── .gitignore           # Git ignore rules
│   ├── .npmignore           # npm ignore rules
│   ├── LICENSE.md           # License information
│   ├── README.md            # CLI-specific documentation
│   └── tsconfig.json        # TypeScript configuration
│
├── dr-github-web/           # Web visualizer directory (Next.js)
│   ├── src/                 # Source code for the web interface
│   │   ├── app/             # Application routes and pages
│   │   ├── components/      # Reusable components
│   │   ├── helpers/         # Helper functions
│   │   ├── hooks/           # Custom React hooks
│   │   ├── configs/         # Configuration files
│   │   ├── stores/          # Zustand stores for state management
│   │   └── common/          # Common types and constants
│   ├── public/              # Static assets like images and icons
│   ├── .eslintrc.json       # ESLint configuration for code linting
│   ├── .gitignore           # Git ignore rules
│   ├── next.config.mjs      # Next.js configuration
│   ├── postcss.config.mjs   # PostCSS configuration for Tailwind CSS
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   ├── README.md            # Documentation for the web visualizer
│   └── tsconfig.json        # TypeScript configuration
│   └── package.json         # Project dependencies
│
├── README.md                # Main monorepo documentation (this file)
├── CONTRIBUTING.md          # Guidelines for contributing to the project
├── .gitignore               # Git ignore rules for the entire monorepo
└── LICENSE.md               # License information for the entire monorepo
```

## Setup Instructions 📑

To set up the monorepo locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/ScreenTechnicals/dr-github.git
cd dr-github

# Install dependencies for both projects
cd dr-github-cli && npm install
cd ../dr-github-web && npm install
```

For detailed setup and usage instructions, please refer to the `README.md` files located in the `dr-github-cli` and `dr-github-web` directories.

## Contribution Guidelines 📋

We welcome contributions from the community! To contribute, please follow these steps:

1. **Fork the repository**: Click the 'Fork' button at the top right of this page.
2. **Create your feature branch**:

   ```bash
   git checkout -b feature/project-name/my-feature
   ```

3. **Commit your changes**:

   ```bash
   git commit -am 'Add a new feature'
   ```

4. **Push to the branch**:

   ```bash
   git push origin feature/project-name/my-feature
   ```

5. **Create a Pull Request**: Submit your PR and describe the changes you have made.

Please ensure that your code adheres to our coding standards and passes all linting checks before submitting a pull request.

## Raise a Issue

- Please make sure that your issue is not already present in the issues
- Issue tile should be: `project-name/<issue title>`, for example: `dr-github-web/fix filter table issue`
- Provide proper details of the issue and mention how to re-create the issue
- if there is an ui issue then, take a screenshot and add it to the description

## License Information 📄

This project is licensed under the [MIT License](./LICENSE.md). By contributing, you agree that your contributions will be licensed under this license.

## Thanks to the Special Contributors and Testers

A big thank you to the following individuals for their contributions and testing:

- [@meness](https://github.com/meness)
- [@RitikJ22](https://github.com/RitikJ22)

## Please Follow ❤️

- [GitHub](https://github.com/ScreenTechnicals)
- [X](https://x.com/ChinmaySa1)
- [LinkedIn](https://www.linkedin.com/in/chinmaya-sa-60a594239)

## Community 🤩

Please join our [Discord Server](https://discord.com/invite/yUtDytzvyS)
