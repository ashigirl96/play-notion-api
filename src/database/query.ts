// @ts-ignore
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = "bc80d83f87914dc78d92caa4dc581faf";
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Feelings",
          text: {
            is_not_empty: true,
          },
        },
        {
          property: "Hash",
          multi_select: {
            contains: "デート",
          },
        },
      ],
    },
    sorts: [
      {
        property: "Date",
        direction: "ascending",
      },
    ],
  });
  const results = response.results;
  console.log(JSON.stringify(results[0]));
})();
