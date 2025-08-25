import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "./routes/book.routes.js";
import memberRoutes from "./routes/member.routes.js";
import borrowRoutes from "./routes/borrow.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Library API running"));
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/transactions", borrowRoutes);

const isTestEnv = process.env.NODE_ENV === "test";
const mongoURI = isTestEnv ? process.env.MONGO_URI_TEST : process.env.MONGO_URI_PROD;

if (!isTestEnv) {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log(`MongoDB Connected to Production DB`);
      app.listen(process.env.PORT || 4000, () =>
        console.log(`Server running on port ${process.env.PORT || 4000}`)
      );
    })
    .catch((err) => console.error(err));
}

export default app;
