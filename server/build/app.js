"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import "dotenv/config";
const mongoose_1 = __importDefault(require("mongoose"));
const express = require("express");
const cors = require("cors");
const admin_js_1 = __importDefault(require("./routes/admin.js"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/admin", admin_js_1.default);
app.use("/users", user_js_1.default);
mongoose_1.default.connect(process.env.DATABASE_URL);
app.listen(3000, () => console.log("Server running on port 3000"));
