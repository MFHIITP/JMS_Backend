import { collection } from "../models/collection.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../index.js";
import tokenschema from "../models/Token.model.js";
import historyschema from "../models/History.model.js";
import bcrypt from "bcrypt";

const loginaction = async (req, res) => {
  try {
    console.log("Login action initiated");

    // Validate inputs
    if (!req.body.email || !req.body.password) {
      console.log("Email or password missing in request body");
      return res.status(400).json({ message: "Email and password are required." });
    }
    console.log("Received email:", req.body.email);

    // Find user
    const user = await collection.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found:", req.body.email);
      return res.status(400).json({
        message: "You have not registered before. Please register first.",
      });
    }
    console.log("User found:", user.email);

    // Validate password
    const isPasswordValid = (req.body.password === user.password);
    if (!isPasswordValid) {
      console.log("Password validation failed for user:", user.email);
      return res.status(400).json({ message: "Wrong Password" });
    }
    console.log("Password validated for user:", user.email);

    // Generate token
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      throw new Error("JWT_SECRET is not defined in the environment variables.");
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("JWT generated:", token);

    // Save token
    const tokenelement = new tokenschema({
      userId: user._id,
      email_id: user.email,
      name: user.name,
      token,
    });
    await tokenelement.save();
    console.log("Token saved to database for user:", user.email);

    // Update or create history
    const historyUpdate = await historyschema.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          logintime: Date.now(),
          status: 'active',
          logouttime: null,
        },
      },
      { upsert: true }
    );
    console.log("Login history updated for user:", user.email);

    // Set profile object
    const profiles = {
      name: user.name,
      email: user.email,
      college: user.college,
      year: user.year,
      department: user.department,
    };
    console.log("Profile object prepared:", profiles);

    // Set cookies
    const isProduction = process.env.NODE_ENV === 'production';
    res.status(200)
      .cookie('Token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'None' : 'Lax',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie('ProfileInfo', profiles, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'None' : 'Lax',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "OK",
        token,
        profileinfo: profiles,
      });
    console.log("Response sent with cookies and token");
  } catch (error) {
    console.error("Error occurred in loginaction:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error });
  }
};

export default loginaction;