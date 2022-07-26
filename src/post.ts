import * as dotenv from "dotenv";
import pkg from "date-fns-tz";
import { Client } from "@notionhq/client";
import { addHours, parseISO } from "date-fns";

dotenv.config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const isInvalidDate = (date: Date) => Number.isNaN(date.getTime());

const TASK_DATABASE_URL = "f60243bbb79a427ca4decc959da17e35";
const JOB = {
  Step: "5e8190080c78436c88e917fe9565c6c4",
  Clinics: "250c6647eed4451bacf0d960257cd14c",
};
const DATABASES = {
  PRM: { Job: JOB.Clinics, id: "5f572b9c11004fd4bec701d0ac5628f5" },
  BLOG: { Job: JOB.Step, id: "6b1fcb085f754030a3629342daf5929f" },
  // CLINICS 雑務
  CZ: { Job: JOB.Clinics, id: "62458a2669c446c58acf657d2fda028e" },
  // REON 雑務
  RZ: { Job: JOB.Step, id: "699d7d7cfe4f407193c2fafbb089c3a5" },
} as const;

const toZoneISOString = (date: Date) => {
  const day = pkg.format(date, "yyyy-MM-dd", {
    timeZone: "Asia/Tokyo",
  });
  const time = pkg.format(date, "HH:mm:ssxxx", {
    timeZone: "Asia/Tokyo",
  });
  return `${day}T${time}`;
};

(async () => {
  const enoughArgs = 4 <= process.argv.length && process.argv.length <= 5;
  if (!enoughArgs) {
    console.log(process.argv);
    process.exit(-1);
  }
  const projectName = process.argv[2];
  const content = process.argv[3];
  const dateArg = process.argv[4] || "hoge";
  // @ts-expect-error
  const project = DATABASES[projectName] || DATABASES.PRM;
  const parsedDate = parseISO(dateArg);
  let now = new Date();
  const startAt = isInvalidDate(parsedDate) ? now : addHours(parsedDate, 10);
  const endAt = addHours(startAt, 1);

  const response = await notion.pages.create({
    parent: {
      database_id: TASK_DATABASE_URL,
    },
    properties: {
      TaskName: {
        title: [
          {
            text: {
              content,
            },
          },
        ],
      },
      Date: {
        date: {
          start: toZoneISOString(startAt),
          end: toZoneISOString(endAt),
        },
      },
      project: {
        relation: [
          {
            id: "0cd307497e4744088b2ce345f602408e",
            // id: project.id,
          },
        ],
      },
    },
  });
  console.log(JSON.stringify(response, null, 2));
})();
