import UserModel from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const register = async (req, res) => {
  try {
    
    const { name, email, password } = req.body;
      console.log("hello")
    // Check if the user already exists
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const userCreated = await UserModel.create({ name, email, password });
    res.status(201).json({
      message: "Registration Successful",
      user: userCreated,
    });
  } catch (error) {
    console.log("dsfkd")
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Login an existing user
export const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
   
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
   
    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      // { expiresIn: "1h" }
    );

    console.log(token,"sadhas")

    // Send the token and user details in the response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar:null
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};