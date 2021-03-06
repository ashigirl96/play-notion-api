import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import { inspect } from "unist-util-inspect";

const processor = unified().use(markdown).use(remark2rehype).use(html);

const input = `
# Hello
## World
### hoge
This is **Notion** *api*.

> this is description
`;

processor.process(input).then((x) => {
  console.log(x.value);
});
const parsed = processor.parse(input); // Markdown to mdast(Markdown AST)
console.log(inspect(parsed));
const transformed = processor.runSync(parsed); // mast to hast(HTML AST)
console.log(inspect(transformed));
