import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface authRequest extends Request {
  user: string;
  headers: {
    authorization: string;
    password: string;
  };
}

const authenticateJwt = (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const user = jwt.verify(token, "process.env.SECRET_KEY") as string; // Use JwtPayload type
      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Forbidden" });
    }
  } else {
    res.sendStatus(401);
  }
};

export default authenticateJwt;
