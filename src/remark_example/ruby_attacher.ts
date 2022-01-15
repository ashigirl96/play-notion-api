import { Processor, unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import { inspect } from "unist-util-inspect";
import { Transformer } from "unified";
import { Node } from "unist";
import { Root } from "mdast";
// import {Root} from "remark-html";

const remarkTest: () => Transformer = () => {
  const transformer: Transformer = (tree: Node) => {
    const root = tree as Root;
    root.children.push({
      type: "paragraph",
      children: [
        {
          type: "text",
          value: "hogehoge",
        },
      ],
    });
    console.log(JSON.stringify(root, null, 2));
    return root;
  };
  return transformer;
};

const processor = unified()
  .use(markdown)
  .use(remarkTest)
  .use(remark2rehype)
  .use(html);

const input = `> this is description`;

processor.process(input).then((x) => {
  console.log(x.value);
});
const parsed = processor.parse(input); // Markdown to mdast(Markdown AST)
// console.log(inspect(parsed));
const transformed = processor.runSync(parsed); // mast to hast(HTML AST)
console.log(inspect(transformed));
