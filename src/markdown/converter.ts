import { MarkdownObject, MarkdownText } from "./types";

export const markdownrify = (objects: MarkdownObject[]) => {
  return objects.map((object) => _markdownrify(object)).join("\n");
};

export const _markdownrify = (x: MarkdownObject) => {
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
      return `> ${text}`;
    case "bulleted_list_item":
      return `- ${text}`;
    case "numbered_list_item":
      return `1. ${text}`;
    case "code":
      return "```" + `${x.language}` + "\n" + text + "\n" + "```";
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
