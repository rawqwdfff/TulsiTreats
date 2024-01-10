import "dotenv/config";
import * as express from "express";
import { Request, Response } from "express";

import * as jwt from "jsonwebtoken";
import { Users, products } from "../db/index.js";

const router = express.Router();

// User routes
router.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new Users({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.headers;
  const user = await Users.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get("/products", async (req: Request, res: Response) => {
  const availableProducts = await products.find({ InStock: true });
  res.json({ availableProducts });
});

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

export default router;
