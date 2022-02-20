import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  // https://www.notion.so/bc80d83f87914dc78d92caa4dc581faf?v=2e27b0c90cf046bc8a0917010b877251
  // https://www.notion.so/106b07299be6414bb14f7c53ef26fc50?v=4f64dd0b21a84069a2f69a4e8d68a298
  const databaseId = "106b07299be6414bb14f7c53ef26fc50";
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "status",
          select: {
            equals: "publish",
          },
        },
      ],
    },
  });
  const results = response;
  console.log(JSON.stringify(results, null, 2));
})();

const hoge = [
  {
    object: "page",
    id: "301306e7-7902-49b8-865b-bc560bf4cc59",
    created_time: "2022-01-06T15:33:00.000Z",
    last_edited_time: "2022-02-20T14:33:00.000Z",
    created_by: {
      object: "user",
      id: "d7176521-3a9a-43d2-b9ed-56cc16cc85b0",
    },
    last_edited_by: {
      object: "user",
      id: "d7176521-3a9a-43d2-b9ed-56cc16cc85b0",
    },
    cover: null,
    icon: {
      type: "emoji",
      emoji: "🎣",
    },
    parent: {
      type: "database_id",
      database_id: "106b0729-9be6-414b-b14f-7c53ef26fc50",
    },
    archived: false,
    properties: {
      status: {
        id: "%3FRbz",
        type: "select",
        select: {
          id: "44894613-656e-4f47-9d18-e293b966535d",
          name: "publish",
          color: "blue",
        },
      },
      Category: {
        id: "ezhB",
        type: "multi_select",
        multi_select: [
          {
            id: "cbcaad35-1169-4a0c-89d1-2c38ac503cfb",
            name: "Markdown",
            color: "brown",
          },
        ],
      },
      Name: {
        id: "title",
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: "すべてのMarkdown",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "すべてのMarkdown",
            href: null,
          },
        ],
      },
    },
    url: "https://www.notion.so/Markdown-301306e7790249b8865bbc560bf4cc59",
  },
] as const;

const iconEmoji = hoge[0].icon.emoji;
const titleName = hoge[0].properties.Name.title[0].plain_text;
const categories = hoge[0].properties.Category.multi_select.map(
  (select) => select.name
);
