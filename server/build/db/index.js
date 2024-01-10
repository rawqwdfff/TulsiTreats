"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.admins = exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String },
    password: String,
    purchasedProducts: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" }],
});
const adminSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
});
const productSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    InStock: Boolean,
});
// Define mongoose models
const Users = mongoose_1.default.model("User", userSchema);
exports.Users = Users;
const admins = mongoose_1.default.model("Admin", adminSchema);
exports.admins = admins;
const products = mongoose_1.default.model("Product", productSchema);
exports.products = products;
