// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../model/User.js"; // Import the User model
import dotenv from "dotenv";

dotenv.config();

const protect = async (req, res, next) => {
  
  try {
    // Get the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
console.log(process.env.JWT_SECRET,"tt")
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    // Find the user associated with the token
    const user = await User.findById(decoded.userId).select("-password");

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    // Attach the user to the request object
    req.user = user;
   
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export { protect };