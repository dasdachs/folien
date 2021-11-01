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

unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(attacher)
  .use(rehypeDocument, {
    title: "Make your own slides",
    responsive: true,
    css: [
      "https://unpkg.com/reset-css/reset.css",
      "./static/vendor/prism.css",
      "./static/slides.css",
    ],
    js: ["./static/vendor/prism.js", "./static/slides.js"],
  })
  .use(rehypeFormat)
  .use(rehypeStringify)
  .process(readSync("make_your_own_slides.md"))
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
