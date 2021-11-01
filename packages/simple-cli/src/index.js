import { Command } from "commander";

import pipeline from "./pipeline.js";

const program = new Command();
program
  .version("0.0.1")
  .command("transform <file>")
  .action((file) => {
    pipeline(file);
  });

program.parse();
