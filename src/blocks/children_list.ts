import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
// const { Client } = require("@notionhq/client");
import { Client } from "@notionhq/client";

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  // const pageId = "9ed6ae588b324574b674db7ad7300f04";
  // https://www.notion.so/PRM-containsTelemedicines-containsWebBooking-82412f84573642e791e76bbac39f68b5
  const pageId = "82412f84573642e791e76bbac39f68b5";

  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  console.log(JSON.stringify(response, null, 2));
})();
