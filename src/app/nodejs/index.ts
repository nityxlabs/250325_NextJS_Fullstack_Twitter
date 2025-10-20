/* 
File Inspiration - Backend: /Users/mohammedkhan/Documents/NityxPlay/Webpack_React_Learn/220325_NodeReduxRouterCRUD/src/nodejs/server.ts
File Inspiration - Backend: /Users/mohammedkhan/Documents/NityxPlay/Webpack_React_Learn/220124_NodeReadWriteFiles/src/nodejs/server.ts
*/
import { expressApp as ExpressTwitter250327 } from "./250327-express-twitter/index-server.ts";

import { expressApp as TestVercelNodeJs } from "./test-vercel-nodejs/index.js";

// Run simple test to see if backend runs
(function () {
  console.log("Welcome to NodeJS index.ts");
})();

(function () {
  // eslint-disable-next-line
  ExpressTwitter250327;

  // eslint-disable-next-line
  TestVercelNodeJs;
})();

console.log("Server.ts is running");
