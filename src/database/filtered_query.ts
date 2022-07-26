import dotenv from "dotenv";
import { Client } from "@notionhq/client";

dotenv.config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = "bc80d83f87914dc78d92caa4dc581faf";
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const { results } = response;
  await Promise.all(
    results.map(async (result) => {
      const id = result.id;
      const response = await notion.pages.update({
        page_id: id,
        properties: {
          imageS3URL: {
            url: null,
          },
        },
      });
      console.log(JSON.stringify(response, null, 2));
    })
  );
  console.log(JSON.stringify(response, null, 2));
})();
