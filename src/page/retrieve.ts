import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
// const { Client } = require("@notionhq/client");
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// (async () => {
//   const blockId = "34ed09e2a63049008e05042e2c531060";
//   const response = await notion.blocks.children.list({
//     block_id: blockId,
//     page_size: 50,
//   });
//   console.log(response);
// })();

// https://www.notion.so/Q-learning-46f97db480a94d62a91432d338b7880d

(async () => {
  const pageId = "46f97db480a94d62a91432d338b7880d";

  const response = await notion.pages.retrieve({
    page_id: pageId,
  });
  console.log(JSON.stringify(response));
})();

const hoge = {
  object: "page",
  id: "301306e7-7902-49b8-865b-bc560bf4cc59",
  created_time: "2022-01-06T15:33:00.000Z",
  last_edited_time: "2022-02-20T16:29:00.000Z",
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
    date: {
      id: "%40T%7Cq",
      type: "date",
      date: {
        start: "2022-02-02",
        end: null,
        time_zone: null,
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
        {
          id: "89bcd714-f3c1-42c9-a3cc-2c5889c98e05",
          name: "NotionAPI",
          color: "default",
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
};
