"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = __importStar(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
const index_js_1 = require("../db/index.js");
const router = express.Router();
// User routes
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield index_js_1.Users.findOne({ username });
    if (user) {
        res.status(403).json({ message: "User already exists" });
    }
    else {
        const newUser = new index_js_1.Users({ username, password });
        yield newUser.save();
        const token = jwt.sign({ username, role: "user" }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        res.json({ message: "User created successfully", token });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const user = yield index_js_1.Users.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username, role: "user" }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        res.json({ message: "Logged in successfully", token });
    }
    else {
        res.status(403).json({ message: "Invalid username or password" });
    }
}));
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const availableProducts = yield index_js_1.products.find({ InStock: true });
    res.json({ availableProducts });
}));
// router.post("/:productID", authenticateJwt, async (req: authRequest, res:Response) => {
//   const product = await products.findById(req.params.courseId);
//   console.log(product);
//   if (product) {
//     const user = await Users.findOne({ username: req.body.username });
//     if (user) {
//       user.purchasedProducts.push(product._id);
//       await user.save();
//       res.json({ message: "Course purchased successfully" });
//     } else {
//       res.status(403).json({ message: "User not found" });
//     }
//   } else {
//     res.status(404).json({ message: "Course not found" });
//   }
// });
// router.get("/purchasedProducts", authenticateJwt, async (req:authRequest, res) => {
//   const user = await Users.findOne({
//     username: req.body.username,
//   }).populate("purchasedProducts");
//   if (user) {
//     res.json({ purchasedProducts: user.purchasedProducts || [] });
//   } else {
//     res.status(403).json({ message: "User not found" });
//   }
// });
exports.default = router;
