import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const JWT_SECRET = "ISAAM_SECRET";

export const signUp = async (req, res, next) => {
   try {
      const hashedPWD = await bcrypt.hash(req.body.password, 10);
      const user = new User({
         ...req.body,
         password: hashedPWD,
      });
      await user.save();

      // Exclude password from the response
      const { password, ...newUser } = user.toObject();
      res.status(201).json({ model: newUser, message: "User registered successfully" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

export const login = async (req, res, next) => {
   try {
      // Find the user by email
      const user = await User.findOne({ email: req.body.email });

      // If not found, return error
      if (!user) {
         return res.status(401).json({ message: "Login ou mot de passe incorrect" });
      }

      // Compare the password
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
         return res.status(401).json({ message: "Login ou mot de passe incorrect" });
      }

      // Respond with a token if login is successful
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "24h" });
      res.status(200).json({
         message: "Login successfully",
         token: token,
      });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};
