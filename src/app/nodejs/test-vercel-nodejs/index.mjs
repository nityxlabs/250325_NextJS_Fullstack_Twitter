import express from "express";

const PORT = 3001;

const expressApp = express();

// expressApp.use((request, response, next) => {
//   const allowedDomain = "http://localhost:3000";
//   // const allowedDomain = 'http://localhost:9000';
//   response.header("Access-Control-Allow-Origin", allowedDomain);
//   response.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   response.header(
//     "Access-Control-Allow-Methods",
//     "GET,POST,DELETE,PATCH,PUT,HEAD"
//   );

//   next();
// });

expressApp.get("/", (request, response) => {
  console.log("CONSOLE.LOG: vercel-test.ts - test path");
  return response.send("/ - root path for vercel-test - v0.0.3 MJS file");
});

expressApp.get("/vercel-test", (request, response) => {
  console.log("CONSOLE.LOG: vercel-test.ts - test path");
  return response.send(
    "/vercel-test this is just testing that there is a test path - v0.0.3 MJS file"
  );
});

expressApp.listen(PORT, () => {
  console.log(`hosting page on port ${PORT} - http://localhost:${PORT}`);
});

// export { expressApp };
