const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const pageId = "4e63b38daeb647979699c2f9bf2463da";

  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  console.log(JSON.stringify(response));
})();
