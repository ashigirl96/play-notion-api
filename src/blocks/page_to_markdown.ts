import { markdownrify, blockToMarkdownObject } from "../markdown/converter.js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const pageId = "4e63b38daeb647979699c2f9bf2463da";

  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  const { results } = response;
  console.log(
    markdownrify(
      results.map((result) => {
        // @ts-ignore
        const type = result.type;
        // @ts-ignore
        return blockToMarkdownObject(type, result);
      })
    )
  );
})();
