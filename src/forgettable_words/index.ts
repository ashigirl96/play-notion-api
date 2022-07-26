import * as dotenv from "dotenv";
import pkg from "date-fns-tz";

dotenv.config({ path: ".env.local" });
import { Client } from "@notionhq/client";
import { startOfDay, addHours, parseISO, format } from "date-fns";

const notion = new Client({ auth: process.env.NOTION_API_KEY });


(async () => {
  const wordAndDefinition = process.argv[2] ?? null;

  if (wordAndDefinition === null) {
    process.exit(1);
  }

  let wordAndDef;
  if (wordAndDefinition.indexOf("　") === -1) {
    wordAndDef = wordAndDefinition.split(" ")
  } else {
    if (wordAndDefinition.indexOf(" ") < wordAndDefinition.indexOf("　")) {
      wordAndDef = wordAndDefinition.split(" ")
    } else {
      wordAndDef = wordAndDefinition.split("　")
    }
  }
  const word = wordAndDef[0];
  const definition = wordAndDef[1];

  // https://www.notion.so/f60243bbb79a427ca4decc959da17e35?v=6d60db9b178249bd9c742c8c0856b541
  // https://www.notion.so/b667d49680cb4887b00612ed1df6668f?v=b658e57e16684dd1adb51fdea0c488ff
  const databaseId = "b667d49680cb4887b00612ed1df6668f";

  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      "言葉": [
        {
          text: {
            content: word,
          },
        },
      ],
      "定義": [
        {
          text: {
            content: definition,
          },
        },
      ],
    }
  })
  console.log(JSON.stringify(response, null, 2));
})();
