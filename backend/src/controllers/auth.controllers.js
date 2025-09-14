import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../email/emailHandlers.js";
import { ENV } from "../lib/env.js";

const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    // ceneck if email valid : regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invaild email format" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist with this Email" });
    }
    // we want to hash the password like : 12345678 => $dfkjh4534_7887hwsds , so we use bcryptjs

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      // before CR:
      // generateToken(newUser._id, res);
      // await newUser.save();

      // after CR:
      // Persist user first, then issue auth cookie
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
      console.log("User Created Successfully");

      // todo
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL
        );
      } catch (error) {
        console.error("Failed to send Welcome Email: ", error);
      }
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log("Error in Signup controller : " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){ 
    return res.status(400).json({ message: "email and password are required" });
}
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid Credentials" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Credentials" });

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      message: "Login successfully" 
    });
    console.log("User Logged in Successfully");
  } catch (error) {
    console.error("Error in login controller : " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logout successfully" });
  console.log("User Logged Out Successfully");
};

export { signUp, login, logout };


// commit for git
