import path from "path";

import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { readSync, writeSync } from "to-vfile";
import { reporter } from "vfile-reporter";
import { unified } from "unified";
import remarkGfm from "remark-gfm";

import attacher from "./plugin.js";

export default function prepare_pipeline(pathToFile, cssFile) {
  const title = path.basename(pathToFile, ".md");

  const css = [
    "https://unpkg.com/reset-css/reset.css",
    "./static/vendor/prism.css",
    "./static/slides.css",
  ];

  if (cssFile) {
    css.push(cssFile);
  }

  unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(attacher)
    .use(rehypeDocument, {
      title,
      responsive: true,
      css,
      js: ["./static/vendor/prism.js", "./static/slides.js"],
    })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(readSync(pathToFile))
    .then(
      (file) => {
        console.error(reporter(file));
        file.extname = ".html";
        writeSync(file);
      },
      (error) => {
        throw error;
      }
    );
}
