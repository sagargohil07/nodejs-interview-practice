import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized accesss" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      email: string;
      id: string;
    };

    console.log("🚀 ~ authMiddleware ~ decoded:", decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized accesss" });
    }

    const user = await User.findOne({ email: decoded.email }).select("email _id");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized accesss" });
    }

    req.user = {
      email: user.email,
      id: user._id.toString(),
    };
    next();
  } catch (error) {
    console.log("🚀 ~ authMiddleware ~ error:", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
