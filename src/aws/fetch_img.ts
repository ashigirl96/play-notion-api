import fetch from "node-fetch";
import fs from "fs";

const Body = fs.readFileSync("/Users/reon.nishimura/Desktop/111.png");
(async () => {
  const response = await fetch(
    "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/57645c51-4ae1-4eb9-8801-e63fe4523354/DSC_1328.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220319T114938Z&X-Amz-Expires=3600&X-Amz-Signature=8922d769ba275d14ad5750db5d0a5ce99f10008bdf549f59d39e2f18ffa65633&X-Amz-SignedHeaders=host&x-id=GetObject"
  );
  // console.log(response.blob());
  const Body = await response.arrayBuffer();
})();

console.log(Body);
