import rehypeFormat from "rehype-format";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

import slidesPlugin from "../src/reHypePlugin/plugin.js";

describe("Rehype plugin correctly concatenates sections", () => {
  test("Rehype plugin correctly handles simple one page slide", () => {
    const file = `# Hello world`;

    expect(
      unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(slidesPlugin)
        .use(rehypeStringify)
        .processSync(file)
        .toString()
        .replace("\n", "")
    ).toBe(`<section class="slide"><h1>Hello world</h1></section>`);
  });

  test("Rehype plugin correctly handles multiple slides one page slide", () => {
    const file = `# Hello world\n---\n- list element 1\n- list element 2\n- list element 3\n---\nA __standalone__ paragraph.`;

    expect(
      unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(slidesPlugin)
        .use(rehypeStringify)
        .use(rehypeFormat)
        .processSync(file)
        .toString()
    ).toBe(
      [
        "",
        `<section class="slide">`,
        `  <h1>Hello world</h1>`,
        `</section>`,
        `<section class="slide">`,
        `  <ul>`,
        `    <li>list element 1</li>`,
        `    <li>list element 2</li>`,
        `    <li>list element 3</li>`,
        `  </ul>`,
        `</section>`,
        `<section class="slide">`,
        `  <p>A <strong>standalone</strong> paragraph.</p>`,
        `</section>`,
        "",
      ].join("\n")
    );
  });
});
