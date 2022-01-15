import { reporter } from "vfile-reporter";
import { remark } from "remark";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkHtml from "remark-html";

remark()
  .use(remarkPresetLintMarkdownStyleGuide)
  .use(remarkHtml)
  .process("*emphasis* and _importance_")
  .then((file) => {
    console.log(String(file));
    console.error(reporter(file));
  });
