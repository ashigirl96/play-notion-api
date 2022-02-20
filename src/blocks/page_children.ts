import dotenv from "dotenv";
import { Client } from "@notionhq/client";

dotenv.config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = "106b07299be6414bb14f7c53ef26fc50";
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const results = response.results;
  const pageIds = results.map((result) => {
    // @ts-ignore
    const url: string = result.url;
    return url.match(/([0-9a-z]{32})$/)?.[0];
  });
  console.log(pageIds);
})();
