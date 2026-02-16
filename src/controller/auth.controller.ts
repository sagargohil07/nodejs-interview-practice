import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        email,
        name: name,
        password: hashedPassword,
      });

      return res
        .status(200)
        .json({ message: "User registered successfully" });
    } catch (error) {
      console.log("🚀 ~ AuthController ~ register ~ error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const accessToken = jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
        },
      );

      const userData = {
        email: user.email,
        id: user._id,
        name: user.name,
      };

      return res
        .status(200)
        .json({ message: "Login successful", user: userData, accessToken });
    } catch (error) {
      console.log("🚀 ~ AuthController ~ register ~ error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

const authController = new AuthController();

export default authController;
