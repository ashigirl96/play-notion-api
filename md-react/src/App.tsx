import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import rehypeReact from "rehype-react";
import React, { createElement, Fragment, useEffect, useState } from "react";

const input = `
# Hello
## World
### hoge
This is **Notion** *api*.

> this is description
`;

const useProcessor = (text: string) => {
  const [Content, setContent] = useState(null);
  useEffect(() => {
    unified()
      .use(markdown)
      .use(remark2rehype)
      .use(html)
      // .use(rehypeReact, { fragment: true })
      .use(rehypeReact, { createElement, Fragment })
      .process(text)
      .then((file) => {
        // @ts-ignore
        setContent(file.result);
      });
  }, [text]);

  return Content;
};

function App() {
  return useProcessor(input);
}

export default App;
