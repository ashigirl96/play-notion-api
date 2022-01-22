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
  has_children: boolean;
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

interface NormalMarkdownObject {
  text: MarkdownText[];
  children: MarkdownObject[];
}

export interface Heading1 extends NormalMarkdownObject {
  type: "heading_1";
}

export interface Heading2 extends NormalMarkdownObject {
  type: "heading_2";
}

export interface Heading3 extends NormalMarkdownObject {
  type: "heading_3";
}

export interface Quote extends NormalMarkdownObject {
  type: "quote";
}

export interface BulletedListItem extends NormalMarkdownObject {
  type: "bulleted_list_item";
}

export interface Todo extends NormalMarkdownObject {
  type: "to_do";
  checked: boolean;
}

export interface Code extends NormalMarkdownObject {
  type: "code";
  language: "typescript" | "rust";
}

export interface NumberedListItem extends NormalMarkdownObject {
  type: "numbered_list_item";
}

export interface Paragraph extends NormalMarkdownObject {
  type: "paragraph";
}
