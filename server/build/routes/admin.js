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
router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    function callback(admin) {
        if (admin) {
            res.status(403).json({ message: "Admin already exists" });
        }
        else {
            const obj = { username: username, password: password };
            const newAdmin = new index_js_1.admins(obj);
            newAdmin.save();
            const token = jwt.sign({ username, role: "admin" }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            res.json({ message: "Admin created successfully", token });
        }
    }
    index_js_1.admins.findOne({ username }).then(callback);
});
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const admin = yield index_js_1.admins.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, role: "admin" }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        res.json({ message: "Logged in successfully", token });
    }
    else {
        res.status(403).json({ message: "Invalid username or password" });
    }
}));
// router.post("/products", authenticateJwt, async (req, res) => {
//   const product = new products(req.body);
//   await product.save();
//   res.json({ message: "Product created successfully", productId: product.id });
// });
// router.put("/products/:productId", authenticateJwt, async (req, res) => {
//   console.log(req.params);
//   const product = await products.findByIdAndUpdate(
//     req.params.productId,
//     req.body,
//     {
//       new: true,
//     }
//   );
//   if (product) {
//     res.json({ message: "Product updated successfully" });
//   } else {
//     res.status(404).json({ message: "Product not found" });
//   }
// });
// router.get("/products", authenticateJwt, async (req, res) => {
//   const availableProducts = await products.find({});
//   res.json({ availableProducts });
// });
exports.default = router;
