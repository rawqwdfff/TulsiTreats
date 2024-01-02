import * as cors from "cors";
import "dotenv/config";
import * as express from "express";
import mongoose from "mongoose";

import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/users", userRouter);

mongoose.connect(process.env.DATABASE_URL);

app.listen(3000, () => console.log("Server running on port 3000"));
