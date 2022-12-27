#!/usr/bin/env node

const ColorThief = require("colorthief");
const { program } = require("commander");

const { rgbToHex } = require("./lib/utils");

program
  .name("coltube")
  .description("CLI to extract color palette from image")
  .version(process.env.npm_package_version)
  .argument("<url>", "Public accessible url to image sourcet")
  .option("-l, --limit <number>", "Number of colors to extract", parseInt, 5)
  .action((imageUrl, options) => {
    ColorThief.getPalette(imageUrl, options.limit)
      .then((palette) => {
        console.log(JSON.stringify(palette.map(rgbToHex)));
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  });

program.parse();
