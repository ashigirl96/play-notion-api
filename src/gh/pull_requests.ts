import { Octokit } from "@octokit/rest";
import pkg from "date-fns-tz";
import * as dotenv from "dotenv";
import { Client } from "@notionhq/client";
import { startOfDay } from "date-fns";

dotenv.config({ path: ".env.local" });
const notion = new Client({ auth: process.env.NOTION_API_KEY });

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const difference = (x: string[], y: string[]) => {
  return x.filter((val) => !y.includes(val));
};

const toZoneISOString = (date: Date) => {
  const day = pkg.format(date, "yyyy-MM-dd", {
    timeZone: "Asia/Tokyo",
  });
  const time = pkg.format(date, "HH:mm:ssxxx", {
    timeZone: "Asia/Tokyo",
  });
  return `${day}T${time}`;
};

const ghPullRequests = async () => {
  const { data: pulls } = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls",
    {
      owner: "medley-inc",
      repo: "medley-clinic",
      per_page: 100,
    }
  );
  const myPulls = pulls.filter(
    (pull) =>
      pull?.assignee?.login === "ashigirl96" &&
      pull.draft === false &&
      !!pull.milestone
  );

  const results = await Promise.all(
    myPulls.map(async (pull) => {
      const { data: reviews } = await octokit.request(
        "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
        {
          owner: "medley-inc",
          repo: "medley-clinic",
          pull_number: pull.number,
        }
      );

      const self = pull.user?.login || "";
      const requestedIds =
        pull.requested_reviewers?.map((user) => user.login) || [];
      const reviewIds = reviews.map((review) => review.user?.login || "");
      const approvedIds = reviews
        .filter((review) => review.state === "APPROVED")
        .map((review) => review.user?.login || "");

      const results = difference(reviewIds, [
        self,
        ...requestedIds,
        ...approvedIds,
      ]);

      if (pull.milestone && pull.milestone.due_on) {
        const dueOn = startOfDay(new Date(pull.milestone.due_on));
        return {
          number: pull.number,
          url: pull.html_url,
          title: pull.title,
          isReviewed: new Set(results).size > 0,
          milestone: toZoneISOString(dueOn),
        };
      } else {
        return {
          number: pull.number,
          url: pull.html_url,
          title: pull.title,
          isReviewed: new Set(results).size > 0,
          milestone: toZoneISOString(new Date()),
        };
      }
    })
  );

  return results;
};

(async () => {
  const pulls = await ghPullRequests();
  const pageId = "b408b55abee0476b98f471106f5421e7";

  const { results: pages } = await notion.databases.query({
    database_id: pageId,
  });

  await Promise.all(
    pages.map(async ({ id }) => {
      return await notion.pages.update({
        page_id: id,
        archived: true,
      });
    })
  );

  await Promise.all(
    pulls.map(async ({ number, title, isReviewed, milestone, url }) => {
      return await notion.pages.create({
        parent: {
          database_id: pageId,
        },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: title,
                },
              },
            ],
          },
          number: {
            number: number,
          },
          isReviewed: {
            checkbox: isReviewed,
          },
          milestone: {
            date: {
              start: milestone,
            },
          },
          url: {
            url: url,
          },
        },
      });
    })
  );
})();
