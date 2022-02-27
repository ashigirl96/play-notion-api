import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  // https://www.notion.so/f60243bbb79a427ca4decc959da17e35?v=6d60db9b178249bd9c742c8c0856b541
  const databaseId = "f60243bbb79a427ca4decc959da17e35";

  // 親のタスクを取り出す
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "MiniTasks",
          relation: {
            is_not_empty: true,
          },
        },
        {
          property: "Date",
          date: {
            next_month: {}, // もしかしたら、２，３ヶ月後にするかも
          },
        },
      ],
    },
  });

  const { results } = response;
  for (const result of results) {
    // @ts-expect-error
    const { properties } = result;
    const { Date, MiniTasks, project } = properties;
    const startAt: string = Date.date.start;
    const miniTaskIds: string[] = MiniTasks.relation.map(
      // @ts-expect-error
      (relation) => relation.id
    );

    // 親の情報を使って子の情報を更新
    for (const miniTaskId of miniTaskIds) {
      const response = await notion.pages.retrieve({ page_id: miniTaskId });
      // @ts-expect-error
      if (response.properties.Date.date === null) {
        await notion.pages.update({
          page_id: miniTaskId,
          properties: {
            Date: {
              date: {
                start: startAt,
              },
            },
            project: {
              relation: project.relation,
            },
          },
        });
        // console.log(JSON.stringify(response, null, 2));
      }
    }
  }
})();
