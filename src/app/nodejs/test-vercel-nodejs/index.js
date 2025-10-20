import express from "express";

const PORT = 3001;

const expressApp = express();

expressApp.use((request, response, next) => {
  const allowedDomain = "http://localhost:3000";
  // const allowedDomain = 'http://localhost:9000';
  response.header("Access-Control-Allow-Origin", allowedDomain);
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  response.header(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,PUT,HEAD"
  );

  response.send("Vercel NodeJS test running");

  next();
});

expressApp.get("/vercel-test", (request, response) => {
  console.log("CONSOLE.LOG: vercel-test.ts - test path");
  response.send(
    "vercel-test.ts - this is just testing that there is a test path"
  );
});

expressApp.listen(PORT, () => {
  console.log(`hosting page on port ${PORT} - http://localhost:${PORT}`);
});

export { expressApp };
