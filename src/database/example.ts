const example = {
  object: "page",
  id: "f81ccf5d-64ef-422e-b443-1a07589fa816",
  created_time: "2022-01-02T08:48:00.000Z",
  last_edited_time: "2022-01-02T14:21:00.000Z",
  cover: null,
  icon: null,
  parent: {
    type: "database_id",
    database_id: "bc80d83f-8791-4dc7-8d92-caa4dc581faf",
  },
  archived: false,
  properties: {
    Feelings: {
      id: "bxof",
      type: "rich_text",
      rich_text: [
        {
          type: "text",
          text: {
            content:
              "初めての旅行。当時は免許を持っていなくて、彼女に運んでもらってた。色んな所に連れていってもらえて、色んな景色を見せてもらった",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text:
            "初めての旅行。当時は免許を持っていなくて、彼女に運んでもらってた。色んな所に連れていってもらえて、色んな景色を見せてもらった",
          href: null,
        },
      ],
    },
    Image: {
      id: "e%3C%7BB",
      type: "files",
      files: [
        {
          name: "DSC_1328.jpg",
          type: "file",
          file: {
            url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/57645c51-4ae1-4eb9-8801-e63fe4523354/DSC_1328.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220218%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220218T122841Z&X-Amz-Expires=3600&X-Amz-Signature=89aa3d5123e492e1db0e0d6b4c4cb0e9ff9215ca3cab10dd55f61be6188eb2ea&X-Amz-SignedHeaders=host&x-id=GetObject",
            expiry_time: "2022-02-18T13:28:41.324Z",
          },
        },
      ],
    },
    Date: {
      id: "hMIn",
      type: "date",
      date: { start: "2018-09-11", end: null, time_zone: null },
    },
    Hash: {
      id: "%7CaCo",
      type: "multi_select",
      multi_select: [
        {
          id: "ffc0f154-9e93-437e-9de6-2849b481a771",
          name: "デート",
          color: "red",
        },
        {
          id: "5facb66c-bc15-4df7-b6cf-f852c9e5675d",
          name: "ドライブ",
          color: "yellow",
        },
      ],
    },
    Title: {
      id: "title",
      type: "title",
      title: [
        {
          type: "text",
          text: { content: "群馬の温泉", link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "群馬の温泉",
          href: null,
        },
      ],
    },
  },
} as const;

console.log(Object.keys(example.properties));

const { Feelings, Image: image, Date: date, Hash, Title } = example.properties;

console.log(Feelings.rich_text.map((text) => text.plain_text)[0]);
console.log(image.files[0].file.url);
console.log(date.date.start);
console.log(Hash.multi_select.map((hash) => hash.name));
console.log(Title.title.map((title) => title.plain_text)[0]);
