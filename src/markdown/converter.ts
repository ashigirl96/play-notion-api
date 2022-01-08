import {
  MarkdownObject,
  MarkdownText,
  NotionObject,
  NotionType,
} from "./types";

export const markdownrify = (objects: MarkdownObject[]) => {
  return objects.map((object) => _markdownrify(object)).join("\n");
};

export const blockToMarkdownObject = (
  notionType: NotionType,
  notionObject: NotionObject
): MarkdownObject => {
  const { language, checked, text: _text } = notionObject[notionType];
  if (_text === undefined) {
    return {
      type: "paragraph",
      text: [],
    };
  }
  const text = _text.map((text) => ({
    content: text.plain_text,
    href: text.href,
    bold: text.annotations.bold,
    italic: text.annotations.italic,
    strikethrough: text.annotations.strikethrough,
    underline: text.annotations.underline,
    code: text.annotations.code,
  }));
  switch (notionType) {
    case "paragraph":
      return {
        type: "paragraph",
        text,
      };
    case "heading_1":
      return {
        type: "heading_1",
        text,
      };
    case "heading_2":
      return {
        type: "heading_2",
        text,
      };
    case "heading_3":
      return {
        type: "heading_3",
        text,
      };
    case "quote":
      return {
        type: "quote",
        text,
      };
    case "bulleted_list_item":
      return {
        type: "bulleted_list_item",
        text,
      };
    case "numbered_list_item":
      return {
        type: "numbered_list_item",
        text,
      };
    case "code":
      return {
        type: "code",
        language,
        text,
      };
    case "to_do":
      return {
        type: "to_do",
        checked,
        text,
      };
    default:
      return {
        type: "paragraph",
        text: [],
      };
  }
};

const _markdownrify = (x: MarkdownObject) => {
  const text = x.text.map((text) => markdownText(text)).join("");
  switch (x.type) {
    case "paragraph":
      return text;
    case "heading_1":
      return `# ${text}`;
    case "heading_2":
      return `## ${text}`;
    case "heading_3":
      return `### ${text}`;
    case "to_do":
      const checked = x.checked ? "x" : " ";
      return `- [${checked}] ${text}`;
    case "quote":
      return `> ${text}\n`;
    case "bulleted_list_item":
      return `- ${text}`;
    case "numbered_list_item":
      return `1. ${text}`;
    case "code":
      return "```" + `${x.language}` + "\n" + text + "\n" + "```";
    default:
      return "";
  }
};

const markdownText = (x: MarkdownText): string => {
  let content = x.content;
  const { bold, italic, strikethrough, underline, code, href } = x;
  content = bold ? `**${content}**` : content;
  content = italic ? `*${content}*` : content;
  content = strikethrough ? `~~${content}~~` : content;
  content = underline ? `<u>${content}</u>` : content;
  content = code ? `\`${content}\`` : content;
  content = href ? `[${content}](${href})` : content;
  return content;
};
