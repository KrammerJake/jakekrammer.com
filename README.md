# Purpose

I wanted a simple solution to keep a personal website and PDF updated using a single `resume.json` file.

## Acknowledgements

Both the website and generated PDF are based on Gayle Laakmann McDowell's [awesome resume format](https://www.careercup.com/resume). You can also download a [Microsoft Word version](https://careercup.com/static_html/Gayle_McDowell_CareerCup_Sample_Resume.doc) if that is all you're looking for.

### Website

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [Chakra-UI](https://chakra-ui.com/)'s component library. I highly recommend both tools for React projects.

NOTE: You can `toggle` dark mode on the website by pressing `t` on your keyboard.

### LaTeX to PDF Resume Generation

Huge shoutout to the [dnl-blkv/mcdowell-cv](https://github.com/dnl-blkv/mcdowell-cv) repo for laying the groundwork for
LaTeX to PDF resume generation. This project would have taken a lot longer if I had to learn LaTeX from scratch. THANK YOU!

# Overview

## Website setup for Mac

TODO: Include setting up netlify to ease deployment issues?

1. Ensure [yarn](https://yarnpkg.com/getting-started/install) is installed globally

```zsh
npm install -g yarn
```

2. Clone and cd into this repository

```zsh
git clone https://github.com/KrammerJake/jakekrammer.com my_awesome_resume
cd my_awesome_resume
```

3. Run the website in dev mode

```zsh
yarn && yarn start
```

## How do I use this?

1. Start at `/src/resume.json` and update the contents to your satisfaction.
2. Once you're finished updating `resume.json`, run `yarn validate:json` to ensure there are no validation errors.
3. If the JSON is valid, you can now generate the `resume.tex` file by running `generate:tex`.
4. Once the `resume.tex` file has been created, you can now run `generate:pdf` to create a `resume.pdf` file that will be saved to the `/public` directory. This will make it accessible via `your-site.com/resume.pdf`. NOTE: The `generate:pdf` command relies on `lualatex` existing at `~/bin/lualatex`. I installed it on my Mac by downloading [MiKTeX](https://miktex.org/download) and following the prompts to install various libraries as I ran the project.

## Important files

The most important file in this project is the `/src/resume.json` file. This will contain your raw resume data including
personal info, degrees, jobs, and awards.

## Important scripts

You can view the full list of the available scripts from your terminal by running `yarn scripts` in the project directory.

NOTE: The `yarn scripts` command requires [jq](https://stedolan.github.io/jq/) to be installed.

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "generate:tex": "node ./src/validateResumeJSON.js && node ./src/generateTexFromJSON.js",
    "generate:pdf": "~/bin/lualatex --output-directory=./public/ --aux-directory=./pdf_generator/ ./pdf_generator/resume.tex",
    "update-resume": "yarn generate:tex && yarn generate:pdf",
    "deploy-dev": "yarn build && netlify deploy --dir=build",
    "deploy-prod": "yarn build && netlify deploy --dir=build --prod",
    "yellowlight": "yarn update-resume && yarn deploy-dev",
    "greenlight": "yarn update-resume && yarn deploy-prod",
    "validate:json": "node ./src/validateResumeJSON.js",
  }
```
