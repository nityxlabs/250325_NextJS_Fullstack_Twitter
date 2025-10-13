import express from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import next from "next";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import connectMongoDB from "./db/connect-mongo-db.ts";

import authRoutes from "./routes/auth.route.ts";
import notificationRoutes from "./routes/notification.route.ts";
import postRoutes from "./routes/post.route.ts";
import userRoutes from "./routes/user.route.ts";

const expressApp = express();
const PORT = process.env.PORT || 8000;

// * NOTE: to resolve the "__dirname is not defined in ES module scope", see source: https://stackoverflow.com/questions/64383909/dirname-is-not-defined-error-in-node-js-14-version
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// access the `.env` file to read values from that file
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

// set up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// TODO: testing dotenv - remove
// console.log("process.env = ", process.env);
// console.log("process.env.MONGO_URI = ", process.env.MONGO_URI);

// middleware: Parse JSON bodies (as sent by HTML forms)
// NOTE: the `limit` refers to file upload size limit. This limit shouldn't be too high to prevent DOS attacks ("Denial of Service")
expressApp.use(express.json({ limit: "1mb" }));
// middleware: used to parse form data
expressApp.use(express.urlencoded({ extended: true }));
// middleware: retrieve data from cookie
expressApp.use(cookieParser());

// Method 1: solve CORS issue when making API call
// expressApp.use(cors());

// Method 2: resolve CORS issue when making API call
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
  next();
});

// TODO: Should I move this into the `nextApp` function?
expressApp.listen(PORT, () => {
  console.log(`hosting page on port ${PORT} - http://localhost:${PORT}`);

  // NOTE: if `MAINTENANCE_MODE === true`, then do not allow access to endpoints to read/write to MongoDB
  // ! EKHANE 25.10.5 - play with simple HTML project then upload this file to Git for Vercel, then figure out AWS maybe?
  if (process.env.DB_SUSPENDED !== "true") {
    // initiate mongoDB database
    connectMongoDB();
  }
});

expressApp.get("/", (request, response) => {
  console.log(
    "CONSOLE.LOG: Root path in 250327-express-twitter/index-server.ts"
  );
  response.send("Hello! From 250327-express-twitter/index-server.ts");
});

expressApp.get("/test", (request, response) => {
  console.log(
    "CONSOLE.LOG: 250327-express-twitter/index-server.ts - test path"
  );
  response.send(
    "250327-express-twitter/index-server.ts - this is just testing that there is a test path"
  );
});

// set up other routes

expressApp.use("/nodejs/api/auth", authRoutes);
expressApp.use("/nodejs/api/notifications", notificationRoutes);
expressApp.use("/nodejs/api/posts", postRoutes);
expressApp.use("/nodejs/api/users", userRoutes);

// ! EKHANE 25.9.28 - need to figure out how to run Next & Node App together
// set up NextJS to run app on single port - see ChatGPT "250928_NextJSNodeSamePort"
// const dev = process.env.NODE_ENV !== "production";
// const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler();
// nextApp.prepare().then(() => {
//   // Your Node.js API route
//   expressApp.get("/api/hello", (req, res) => {
//     res.json({ message: "Hello from Node API!" });
//   });

//   // Next.js pages
//   expressApp.all("*", (req, res) => {
//     return handle(req, res);
//   });

//   // const port = 3000;
//   // expressApp.listen(port, () => {
//   //   console.log(`Server running on http://localhost:${port}`);
//   // });

//   // expressApp.listen(PORT, () => {
//   //   console.log(`hosting page on port ${PORT} - http://localhost:${PORT}`);
//   //   // initiate mongoDB database
//   //   connectMongoDB();
//   // });
// });

export { expressApp };
