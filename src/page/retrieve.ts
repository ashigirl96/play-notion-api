const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const pageId = "4e63b38daeb647979699c2f9bf2463da";

  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 10,
  });
  console.log(JSON.stringify(response));
})();

const retrievedPage = {
  object: "page",
  id: "4e63b38d-aeb6-4797-9699-c2f9bf2463da",
  created_time: "2022-01-06T15:33:00.000Z",
  last_edited_time: "2022-01-06T15:36:00.000Z",
  cover: null,
  icon: null,
  parent: {
    type: "database_id",
    database_id: "106b0729-9be6-414b-b14f-7c53ef26fc50",
  },
  archived: false,
  properties: {
    Category: {
      id: "ezhB",
      type: "multi_select",
      multi_select: [
        {
          id: "5b2f2359-c671-4cd8-bff4-6e187a81daa7",
          name: "強化学習",
          color: "red",
        },
      ],
    },
    Name: {
      id: "title",
      type: "title",
      title: [
        {
          type: "text",
          text: { content: "Hello World Notion API", link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "Hello World Notion API",
          href: null,
        },
      ],
    },
  },
  url: "https://www.notion.so/Hello-World-Notion-API-4e63b38daeb647979699c2f9bf2463da",
};
