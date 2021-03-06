import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import rehypeReact from "rehype-react";
import rehypeShiki from "@leafac/rehype-shiki";
import * as shiki from "shiki";
import { createElement, Fragment, useEffect, useMemo, useState } from "react";

import { FC } from "react";

export const MyLink: FC = ({ children }) => {
  return (
    <div>
      Hello!?
      <a href="https://google.com">{children}</a>
    </div>
  );
};

export const MyParagraph: FC = ({ children }) => {
  return <div>DIV!!: {children}</div>;
};

const code = "```javascript\nreturn unified();\n```";

const input = `
# Hello
## World
### hoge
This is **Notion** *api*.

[hoge](http://yahoo.co.jp)

> this is description

> this is description

${code}

`;

const useProcessor = (text: string) => {
  const [Content, setContent] = useState(null);
  const highlighter = shiki.getHighlighter({
    theme: "nord",
  });
  useEffect(() => {
    unified()
      .use(markdown)
      .use(remark2rehype)
      // .use(rehypeShiki, {
      //   highlighter,
      // })
      .use(html)
      // .use(rehypeParse, { fragment: true }) // HTMLをhastへ変換する
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          a: MyLink,
          p: MyParagraph,
        },
      })
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
