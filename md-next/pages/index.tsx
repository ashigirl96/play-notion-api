import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { unified } from "unified";
import markdown from "remark-parse";
import rehypeParse from "rehype-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import rehypeReact from "rehype-react";

import { createElement, Fragment, useEffect, useMemo, useState } from "react";
import rehypeShiki from "@leafac/rehype-shiki";
import * as shiki from "shiki";
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

const useProcessor = (content: any) => {
  const [Content, setContent] = useState(null);
  // setContent(content);
  return Content;
};

type StaticProps = {
  content: any;
};

const markdownToHtml = async (text: string) => {
  return (
    unified()
      .use(markdown)
      .use(remark2rehype)
      .use(rehypeShiki, {
        highlighter: await shiki.getHighlighter({ theme: "nord" }),
      })
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
      .then((file) => file)
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const html = await markdownToHtml(input);
  console.log(JSON.stringify(html, null, 2));
  const content = html.toString();
  console.log(content);
  return {
    props: {
      content,
    },
  };
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const App: NextPage<PageProps> = ({ content }) => {
  return useProcessor(content);
};

export default App;
