import { Command } from "commander";

import transform from "./commands/transform.js";

const program = new Command();

program
  .version("1.1.0")
  .name("slidez")
  .description(
    `Transforms your markdown files to html slides.\nSlides are separated with thematic breaks.\n\nFor more info got to https:/github.com/dasdachs/folien`
  )
  .argument("<file>", "path to markdown file")
  .option("-c, --css <files...>", "include custom style sheets.")
  .action((file, options) => {
    transform(file, options.css);
  });

program.parse(process.argv);
