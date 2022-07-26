import fetch from "node-fetch";
import AWS from "aws-sdk";
import fs from "fs";

import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-1",
});
const s3 = new AWS.S3();

(async () => {
  const Bucket = "travel-gallery";
  const Key = `${Math.floor(Math.random() * 100000000000000)}.png`;
  const response = await fetch(
    "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f67c89d2-b013-4dff-9906-52a6611f304d/IMG_0997.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220319T141301Z&X-Amz-Expires=3600&X-Amz-Signature=30e89492b8669ccc8496878c4169fab7133bd52b563b2278985f0faa06e48b5f&X-Amz-SignedHeaders=host&x-id=GetObject"
  );
  const bodyArray = await response.arrayBuffer();
  const Body = Buffer.from(bodyArray);
  s3.putObject(
    {
      Bucket,
      Key,
      Body: Body,
    },
    (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    }
  );
})();
