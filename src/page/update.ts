import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
// const { Client } = require("@notionhq/client");
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  // https://www.notion.so/bc80d83f87914dc78d92caa4dc581faf?v=2e27b0c90cf046bc8a0917010b877251
  // https://www.notion.so/106b07299be6414bb14f7c53ef26fc50?v=4f64dd0b21a84069a2f69a4e8d68a298
  // const pageId = "301306e7790249b8865bbc560bf4cc59";
  const pageId = "028f6f15-4c8a-4d74-aece-d515dece24aa";

  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      Date: {
        date: {
          start: "2022-03-01",
        },
      },
    },
  });
  console.log(JSON.stringify(response));
})();
