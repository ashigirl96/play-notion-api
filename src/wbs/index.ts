import * as dotenv from "dotenv";
import pkg from "date-fns-tz";

dotenv.config({ path: ".env.local" });
import { Client } from "@notionhq/client";
import { startOfDay, addHours, parseISO, format } from "date-fns";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const toZoneISOString = (date: Date) => {
  const day = pkg.format(date, "yyyy-MM-dd", {
    timeZone: "Asia/Tokyo",
  });
  const time = pkg.format(date, "HH:mm:ssxxx", {
    timeZone: "Asia/Tokyo",
  });
  return `${day}T${time}`;
};

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
          or: [
            {
              property: "Date",
              date: {
                next_month: {}, // もしかしたら、２，３ヶ月後にするかも
              },
            },
            {
              property: "isWeek?",
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      ],
    },
  });

  console.log(JSON.stringify(response, null, 2))

  const { results } = response;
  for (const result of results) {
    // @ts-expect-error
    const { properties, id } = result;
    const { Date: date, MiniTasks, project, Job, TaskName } = properties;

    const parentTitle = TaskName.title[0].plain_text;
    const parentStartTime = parseISO(date.date.start);
    const startTime = addHours(startOfDay(parentStartTime), 10);
    const startAt_ = parentStartTime > startTime ? parentStartTime : startTime;
    const startAt = startAt_ > new Date() ? startAt_ : new Date();
    const endAt = addHours(startAt, 1);
    const miniTaskIds: string[] = MiniTasks.relation.map(
      // @ts-expect-error
      (relation) => relation.id
    );

    await notion.pages.update({
      page_id: id,
      properties: {
        isParent: {
          checkbox: true,
        }
      }
    })

    // 親の情報を使って子の情報を更新
    for (const miniTaskId of miniTaskIds) {
      const response = await notion.pages.retrieve({ page_id: miniTaskId });
      // @ts-expect-error
      if (response.properties.Date.date === null) {
        console.log(JSON.stringify(response, null, 2));
        // @ts-expect-error
        const childTitle = response.properties.TaskName.title[0].plain_text;
        await notion.pages.update({
          page_id: miniTaskId,
          properties: {
            TaskName: {
              title: [
                {
                  text: {
                    content: `[${parentTitle}] ${childTitle}`,
                  },
                },
              ],
            },
            Date: {
              date: {
                start: toZoneISOString(startAt),
                end: toZoneISOString(endAt),
              },
            },
            project: {
              relation: project.relation,
            },
          },
        });
      }
    }
  }

})();
