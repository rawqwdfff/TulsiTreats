"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.admins = exports.Users = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.default.Schema({
    username: { type: String },
    password: String,
    purchasedProducts: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" }],
});
var adminSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
});
var productSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    InStock: Boolean,
});
// Define mongoose models
var Users = mongoose_1.default.model("User", userSchema);
exports.Users = Users;
var admins = mongoose_1.default.model("Admin", adminSchema);
exports.admins = admins;
var products = mongoose_1.default.model("Product", productSchema);
exports.products = products;
