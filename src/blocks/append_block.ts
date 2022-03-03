import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { Client } from "@notionhq/client";

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const pageId = "82412f84573642e791e76bbac39f68b5";

  const response = await notion.blocks.children.append({
    block_id: pageId,
    children: [
      {
        object: "block",
        // @ts-expect-error
        type: "mention",
        mention: {
          type: "date",
          date: {
            start: "2022-03-07T09:00:00.000+09:00",
            end: null,
            time_zone: null,
          },
        },
      },
    ],
  });
  console.log(JSON.stringify(response, null, 2));
})();
