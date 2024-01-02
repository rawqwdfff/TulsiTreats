import "dotenv/config";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { admins, products } from "../db/index.js";
import authenticateJwt from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  function callback(admin: object | null) {
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new admins(obj);
      newAdmin.save();
      const token = jwt.sign(
        { username, role: "admin" },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.json({ message: "Admin created successfully", token });
    }
  }
  admins.findOne({ username }).then(callback);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await admins.findOne({ username, password });
  if (admin) {
    const token = jwt.sign(
      { username, role: "admin" },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/products", authenticateJwt, async (req, res) => {
  const product = new products(req.body);
  await product.save();
  res.json({ message: "Product created successfully", productId: product.id });
});

router.put("/products/:productId", authenticateJwt, async (req, res) => {
  console.log(req.params);

  const product = await products.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  if (product) {
    res.json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.get("/products", authenticateJwt, async (req, res) => {
  const availableProducts = await products.find({});
  res.json({ availableProducts });
});

export default router;
