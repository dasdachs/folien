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

import slidesPlugin from "../reHypePlugin/plugin.js";

/**
 * preparePipeline defines the unified.js pipeline and inject the html link (css) headers and js scripts.
 *
 * @param {string} pathToFile - relative or absolute path to file you are transforming
 * @param {string} outDir - relative or absolute path for file output
 * @param {string[]} [cssFiles] - path to the css style sheet. Css file were be concatenated with the default styles.
 * @param {string[]} [prismaFiles] - path to the prism.js style sheets and javascript files. Prisma files will be concatenated
 */
export default function preparePipeline(
  pathToFile,
  outDir,
  cssFiles,
  prismaFiles
) {
  const title = path.basename(pathToFile, ".md");

  let css = [
    "https://unpkg.com/reset-css/reset.css",
    "./static/vendor/prism.css",
    "./static/slides.css",
  ];

  if (cssFiles) {
    css.concat(cssFiles);
    css = [...css, ...cssFiles];
  }

  unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(slidesPlugin)
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

        if (outDir) {
          file.cwd = outDir;
        }

        writeSync(file);
      },
      (error) => {
        throw error;
      }
    );
}
