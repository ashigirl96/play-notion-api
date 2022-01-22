import { blockToMarkdownObject, markdownrify } from "../markdown/converter.js";

import * as dotenv from "dotenv";
import { Client } from "@notionhq/client";
import { MarkdownObject } from "../markdown/types";

dotenv.config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const buildMarkdownObject = async (pageId: string) => {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  const { results } = response;
  const objs: MarkdownObject[] = [];
  for (const result of results) {
    // @ts-ignore
    const type = result.type;
    // @ts-ignore
    const { has_children: hasChildren } = result;
    const children = hasChildren ? await buildMarkdownObject(result.id) : [];
    // @ts-ignore
    objs.push(blockToMarkdownObject(type, result, children));
  }
  return objs;
};

(async () => {
  // https://www.notion.so/Hello-World-Notion-API-4e63b38daeb647979699c2f9bf2463da
  const pageId = "9ed6ae588b324574b674db7ad7300f04";
  // const pageId = "4e63b38daeb647979699c2f9bf2463da";

  const objs = await buildMarkdownObject(pageId);
  console.log(markdownrify(objs, 0));

  // const response = await notion.blocks.children.list({
  //   block_id: pageId,
  //   page_size: 100,
  // });
  // const { results } = response;
  // console.log(
  //   markdownrify(
  //     results.map((result) => {
  //       // @ts-ignore
  //       const type = result.type;
  //       // @ts-ignore
  //       const { has_children: hasChildren } = result;
  //       // @ts-ignore
  //       return blockToMarkdownObject(type, result, []);
  //     })
  //   )
  // );
})();
