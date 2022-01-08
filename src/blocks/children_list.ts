const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const pageId = "4e63b38daeb647979699c2f9bf2463da";

  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  console.log(JSON.stringify(response));
})();

export const childrenList = {
  object: "list",
  results: [
    {
      object: "block",
      id: "670bd066-4a19-44d4-bae3-c4f178e5284c",
      created_time: "2022-01-06T15:34:00.000Z",
      last_edited_time: "2022-01-06T15:34:00.000Z",
      has_children: false,
      archived: false,
      type: "table_of_contents",
      table_of_contents: {},
    },
    {
      object: "block",
      id: "6c6d5c9c-0ef4-451f-af20-5ed2244bd0b2",
      created_time: "2022-01-06T15:34:00.000Z",
      last_edited_time: "2022-01-08T06:29:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_1",
      heading_1: {
        text: [
          {
            type: "text",
            text: { content: "Heading 1", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "Heading 1",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "49ac382c-b3d6-4ecc-91e5-b7ceb8e0234a",
      created_time: "2022-01-06T15:35:00.000Z",
      last_edited_time: "2022-01-06T15:35:00.000Z",
      has_children: false,
      archived: false,
      type: "bulleted_list_item",
      bulleted_list_item: {
        text: [
          {
            type: "text",
            text: { content: "Hello", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "Hello",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "78c6b627-1fa0-41df-92b4-9fe359d53a43",
      created_time: "2022-01-06T15:35:00.000Z",
      last_edited_time: "2022-01-06T15:49:00.000Z",
      has_children: true,
      archived: false,
      type: "bulleted_list_item",
      bulleted_list_item: {
        text: [
          {
            type: "text",
            text: { content: "Notion API", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "Notion API",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "2a528276-7c1c-410f-b0a6-1d9a3edfa284",
      created_time: "2022-01-08T06:26:00.000Z",
      last_edited_time: "2022-01-08T06:26:00.000Z",
      has_children: false,
      archived: false,
      type: "to_do",
      to_do: {
        text: [
          {
            type: "text",
            text: { content: "CheckBoxxx", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "CheckBoxxx",
            href: null,
          },
        ],
        checked: false,
      },
    },
    {
      object: "block",
      id: "db59313c-9d5f-4db4-99f5-3633b39e8ca9",
      created_time: "2022-01-08T06:27:00.000Z",
      last_edited_time: "2022-01-08T06:27:00.000Z",
      has_children: false,
      archived: false,
      type: "quote",
      quote: {
        text: [
          {
            type: "text",
            text: { content: "こんなこと言うてますけど", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "こんなこと言うてますけど",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "2b21a394-904a-4a0c-a180-08ba6eee0ca7",
      created_time: "2022-01-08T06:27:00.000Z",
      last_edited_time: "2022-01-08T06:28:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [
          {
            type: "text",
            text: { content: "イタリック", link: null },
            annotations: {
              bold: false,
              italic: true,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "イタリック",
            href: null,
          },
          {
            type: "text",
            text: { content: " ", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: " ",
            href: null,
          },
          {
            type: "text",
            text: { content: "ボールド", link: null },
            annotations: {
              bold: true,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "ボールド",
            href: null,
          },
          {
            type: "text",
            text: { content: " ", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: " ",
            href: null,
          },
          {
            type: "text",
            text: { content: "イタリック", link: null },
            annotations: {
              bold: true,
              italic: true,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "イタリック",
            href: null,
          },
          {
            type: "text",
            text: { content: "&Bold", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "&Bold",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "1f9ec73c-0d25-4f9a-b8df-63539a385ac6",
      created_time: "2022-01-08T06:28:00.000Z",
      last_edited_time: "2022-01-08T06:28:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [
          {
            type: "text",
            text: { content: "打ち消", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: true,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "打ち消",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "784ba8db-9764-44ed-8ef6-c427be6d1619",
      created_time: "2022-01-08T06:28:00.000Z",
      last_edited_time: "2022-01-08T06:28:00.000Z",
      has_children: false,
      archived: false,
      type: "code",
      code: {
        text: [
          {
            type: "text",
            text: { content: 'console.log("Hello, world");', link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: 'console.log("Hello, world");',
            href: null,
          },
        ],
        language: "typescript",
      },
    },
    {
      object: "block",
      id: "d3e85f41-0d55-4f96-a018-e7c7dc00ecf2",
      created_time: "2022-01-06T15:35:00.000Z",
      last_edited_time: "2022-01-06T15:35:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: { text: [] },
    },
    {
      object: "block",
      id: "9a23bb57-964c-481a-9b92-d35e4954e1d4",
      created_time: "2022-01-06T15:35:00.000Z",
      last_edited_time: "2022-01-06T15:35:00.000Z",
      has_children: false,
      archived: false,
      type: "numbered_list_item",
      numbered_list_item: {
        text: [
          {
            type: "text",
            text: { content: "ハロー", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "ハロー",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "9083988a-7f91-411c-bd2f-ebaeebd666f7",
      created_time: "2022-01-06T15:35:00.000Z",
      last_edited_time: "2022-01-06T15:50:00.000Z",
      has_children: true,
      archived: false,
      type: "numbered_list_item",
      numbered_list_item: {
        text: [
          {
            type: "text",
            text: { content: "ノーションAPI", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "ノーションAPI",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "6908e674-4579-46eb-824f-7ae8fdcc4705",
      created_time: "2022-01-06T15:34:00.000Z",
      last_edited_time: "2022-01-08T06:29:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_2",
      heading_2: {
        text: [
          {
            type: "text",
            text: { content: "Heading 2", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "Heading 2",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "b52e6542-4a76-4fde-81a1-368aa45785b0",
      created_time: "2022-01-06T15:34:00.000Z",
      last_edited_time: "2022-01-06T15:34:00.000Z",
      has_children: true,
      archived: false,
      type: "table",
      table: {
        table_width: 2,
        has_column_header: false,
        has_row_header: false,
      },
    },
    {
      object: "block",
      id: "b119564b-d7d0-4d40-9a0a-42f4d8756a78",
      created_time: "2022-01-06T15:35:00.000Z",
      last_edited_time: "2022-01-06T15:35:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: { text: [] },
    },
  ],
  next_cursor: null,
  has_more: false,
};
