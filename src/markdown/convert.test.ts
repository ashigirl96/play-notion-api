import { MarkdownObject } from "./types";
import { markdownrify } from "./converter";

const space = {
  content: " ",
  bold: false,
  italic: false,
  strikethrough: false,
  underline: false,
  code: false,
};

describe("markdownrify", () => {
  test("success", () => {
    const tests: MarkdownObject[] = [
      {
        type: "paragraph",
        text: [
          {
            content: "hello",
            bold: true,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
          },
          space,
          {
            content: "notion",
            bold: false,
            italic: true,
            strikethrough: false,
            underline: false,
            code: false,
          },
          space,
          {
            content: "api",
            bold: false,
            italic: false,
            strikethrough: true,
            underline: false,
            code: false,
          },
          space,
          {
            content: "let's",
            bold: false,
            italic: false,
            strikethrough: false,
            underline: true,
            code: false,
          },
          space,
          {
            content: "start",
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: true,
          },
        ],
      },
      {
        type: "heading_1",
        text: [
          {
            content: "heading 1",
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
          },
        ],
      },
      {
        type: "heading_2",
        text: [
          {
            content: "heading 2",
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
          },
        ],
      },
      {
        type: "heading_3",
        text: [
          {
            content: "heading 3",
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
          },
        ],
      },
      {
        type: "quote",
        text: [
          {
            content: "quote",
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
          },
        ],
      },
      {
        type: "to_do",
        checked: false,
        text: [
          {
            content: "in-progress",
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
          },
        ],
      },
      {
        type: "to_do",
        checked: true,
        text: [
          {
            content: "done",
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
          },
        ],
      },
      {
        type: "bulleted_list_item",
        text: [
          {
            content: "hello",
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
          },
        ],
      },
      {
        type: "numbered_list_item",
        text: [
          {
            content: "world",
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
          },
        ],
      },
      {
        type: "code",
        language: "typescript",
        text: [
          {
            content: "console.log(x)",
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
          },
        ],
      },
    ];
    expect(markdownrify(tests)).toBe(
      `**hello** *notion* ~~api~~ <u>let's</u> ` +
        "`start`" +
        `
# heading 1
## heading 2
### heading 3
> quote
- [ ] in-progress
- [x] done
- hello
1. world
` +
        "```typescript\nconsole.log(x)\n```"
    );
  });
});
