import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    // 👇 Skip Arcjet locally
    if (process.env.NODE_ENV === "development") {
      return next();
    }

    const dicision = await aj.protect(req);
    if (dicision.isDenied()) {
      if (dicision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate Limit Exceeded" });
      } else if (dicision.reason.isBot) {
        return res.status(403).json({ message: "Bot Access Denied" });
      } else {
        res.status(403).json({ message: "Access Denied" });
      }
    }

    // check for spoofed bots
    if (dicision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    next();
  } catch (error) {
    console.log("Arcjet Protection Error : ", error);
    next();
  }
};
