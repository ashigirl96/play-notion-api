import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import rehypeReact from "rehype-react";
import rehypeStringify from "rehype-stringify";

import { createElement, Fragment, useEffect } from "react";

const input = `
# Hello
## World
### hoge
This is **Notion** *api*.

> this is description
> this is description
`;

// processor.process(input).then((x) => {
//   console.log(x.value);
// });
// const parsed = processor.parse(input); // Markdown to mdast(Markdown AST)
// console.log(inspect(parsed));
// const transformed = processor.runSync(parsed); // mast to hast(HTML AST)
// console.log(inspect(transformed));

const useProcessor = (text: string) => {
  useEffect(() => {
    const x = unified()
      .use(markdown)
      .use(remark2rehype)
      .use(html)
      // .use(rehypeReact, { Fragment: true })
      .use(rehypeReact, { createElement, Fragment })
      .use(rehypeStringify)
      .process(text)
      .then((file) => console.log(file.result));
    // .process(text)
    // .then((file) => {
    //   console.log(file.result);
    // });
  }, [text]);
};

export default function App() {
  return useProcessor(input);
}
