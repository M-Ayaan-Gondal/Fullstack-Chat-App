import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const{JWT_SECRET,NODE_ENV} = ENV;
  if(!JWT_SECRET) throw new Error("JWT_SECRET is not configured");
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevents XSS attacks
    sameSite: "strict", // prevents CSRF
    secure: ENV.NODE_ENV === "developemnt" ? false : true,
  });
  return token;
};

// development :
// http:localhost

// production :
// https:chat-app.com
