import {
  MarkdownObject,
  MarkdownText,
  NotionObject,
  NotionType,
} from "./types";

export const markdownrify = (
  objects: MarkdownObject[],
  generation: number
): string => {
  return objects
    .map((object_) => {
      const parent = _markdownrify(object_, generation);
      const children = markdownrify(object_.children, generation + 1);
      return `${parent}\n${children}`;
    })
    .join("");
};

export const blockToMarkdownObject = (
  notionType: NotionType,
  notionObject: NotionObject,
  notionChildren: MarkdownObject[]
): MarkdownObject => {
  const { language, checked, text: _text } = notionObject[notionType];
  if (_text === undefined) {
    return {
      type: "paragraph",
      text: [],
      children: notionChildren,
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
        children: notionChildren,
      };
    case "heading_1":
      return {
        type: "heading_1",
        text,
        children: notionChildren,
      };
    case "heading_2":
      return {
        type: "heading_2",
        text,
        children: notionChildren,
      };
    case "heading_3":
      return {
        type: "heading_3",
        text,
        children: notionChildren,
      };
    case "quote":
      return {
        type: "quote",
        text,
        children: notionChildren,
      };
    case "bulleted_list_item":
      return {
        type: "bulleted_list_item",
        text,
        children: notionChildren,
      };
    case "numbered_list_item":
      return {
        type: "numbered_list_item",
        text,
        children: notionChildren,
      };
    case "code":
      return {
        type: "code",
        language,
        text,
        children: notionChildren,
      };
    case "to_do":
      return {
        type: "to_do",
        checked,
        text,
        children: notionChildren,
      };
    default:
      return {
        type: "paragraph",
        text: [],
        children: notionChildren,
      };
  }
};

const _markdownrify = (x: MarkdownObject, generation: number = 0) => {
  const text = x.text.map((text) => markdownText(text)).join("");
  const tab = "\t".repeat(generation);
  const element = (() => {
    switch (x.type) {
      case "paragraph":
        return `${text}`;
      case "heading_1":
        return `# ${text}`;
      case "heading_2":
        return `## ${text}`;
      case "heading_3":
        return `### ${text}`;
      case "to_do":
        const checked = x.checked ? "x" : " ";
        return `$- [${checked}] ${text}`;
      case "quote":
        return `$> ${text}\n`;
      case "bulleted_list_item":
        return `$- ${text}`;
      case "numbered_list_item":
        return `$1. ${text}`;
      case "code":
        const start = "```" + x.language;
        const content = text.split("\n").join("\n" + tab);
        const end = tab + "```";
        return `${start}\n${content}\n${end}`;
      default:
        return "";
    }
  })();
  return `${tab}${element}`;
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
