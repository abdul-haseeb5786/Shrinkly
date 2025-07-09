import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./src/config/mongo.config.js";
import short_url from "./src/routes/short_url.route.js";
import auth_routes from "./src/routes/auth.routes.js";
import user_routes from "./src/routes/user.route.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookiaParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiaParser());
app.use(attachUser);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);
app.use("/api/user", user_routes );
app.get("/:id", redirectFromShortUrl);
app.use(errorHandler);
// app.get('/', (req, res) => {
//   res.redirect(process.env.FRONTEND_URL);
// });


app.get("/", (req, res) => {
  res.send(`<h1>Welcome to URL Shortener API</h1>`);
});

// ✅ START SERVER AFTER DB CONNECTS
const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("✅ MongoDB connected");
      console.log("🚀 Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();

export default app;
