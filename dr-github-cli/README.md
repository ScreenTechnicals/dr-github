# Dr. Github

**Dr. Github** is a cli tool that examines the project from Local or from GitHub repo using AI

## Installation

Install the package via npm or yarn or bun:

```
npm install dr-github -g
```

## Get Started

Run the following command to initialize dr-github

```
dr-github init
```

## Start Examining Project

```
dr-github examine
```

## API Key

- You will need at least a `tier-1` plan of open ai that's all.
- Run the following command to change the api key you want to change

```
dr-github setkey
```

This command will generate a `.env` file with your api key in the repective dir.

## How to Define Conventions(optional) ?

Create a `.drconventions` file in the root dir where you are currently running dr-github cli and define your **conventions** as raw text. It will automatically read that file and use it while reviewing your codes.

## How to ignore files and folders that are not required?

For this `.gitignore` file should be present in the root dir.
It will then automatically generate a `.drignore` file where all your restricted files are defined and if you want you can customize it for local projects but not for repos.

## AI Models Used

### Open AI

- gpt-3.5-turbo (200,000 TPM)
- gpt-4 (10,000 TPM)
- gpt-4o (30,000 TPM)
- gpt-4-turbo (30,000 TPM)
- gpt-4o-mini (200,000 TPM)

NOTE: you can select any one of these models according to your requirements

## Visualization

You can visualize the `ai-report.json` file in a table view for better readablity and can even create a shareable image which you can post on X, LinkedIn etc..

#### vist: [dr-github](https://dr-github.devverse.io/)

### Shareale Image Example

![Management-System-report](https://github.com/user-attachments/assets/89c0b915-b85e-441d-9908-7a91d90cc79c)

### Table Visualization

![Screenshot 2024-08-11 at 1 14 47 AM](https://github.com/user-attachments/assets/bc88b46a-eb84-4258-a265-14c030af9404)

## License

This project is licensed under the MIT License
