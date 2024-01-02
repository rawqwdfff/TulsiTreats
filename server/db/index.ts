import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  InStock: Boolean,
});

// Define mongoose models
const Users = mongoose.model("User", userSchema);
const admins = mongoose.model("Admin", adminSchema);
const products = mongoose.model("Product", productSchema);

export { Users, admins, products };
