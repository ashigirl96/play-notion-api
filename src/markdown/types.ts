export type MarkdownText = {
  content: string;
  href?: string;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
};

export type NotionType =
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "quote"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "code"
  | "to_do"
  | "paragraph"
  | "default";

export type NotionObject = {
  [key in NotionType]: {
    text?: {
      type: "text";
      text: { content: string; link: null | string };
      plain_text: string;
      href?: string;
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
    }[];
    checked: boolean;
    language: "rust" | "typescript";
  };
} & {
  type: NotionType;
};

export type MarkdownObject =
  | Heading1
  | Heading2
  | Heading3
  | Quote
  | BulletedListItem
  | NumberedListItem
  | Todo
  | Code
  | Paragraph;

export interface Heading1 {
  type: "heading_1";
  text: MarkdownText[];
}

export interface Heading2 {
  type: "heading_2";
  text: MarkdownText[];
}

export interface Heading3 {
  type: "heading_3";
  text: MarkdownText[];
}

export interface Quote {
  type: "quote";
  text: MarkdownText[];
}

export interface BulletedListItem {
  type: "bulleted_list_item";
  text: MarkdownText[];
}

export interface Todo {
  type: "to_do";
  checked: boolean;
  text: MarkdownText[];
}

export interface Code {
  type: "code";
  language: "typescript" | "rust";
  text: MarkdownText[];
}

export interface NumberedListItem {
  type: "numbered_list_item";
  text: MarkdownText[];
}

export interface Paragraph {
  type: "paragraph";
  text: MarkdownText[];
}
