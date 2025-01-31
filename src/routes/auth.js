const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d", 
    });
};

router.post("/signUp", async (req, res) => {
    const { firstName, lastName, role, email, password } = req.body;

    try {
        if (!firstName || !lastName || !email || !password) {
			return res
				.status(400)
				.json({ msg: "Please enter all required fields" });
		}

        let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ msg: "User already exists" });
		}

        user = new User({
            firstName,
            lastName,
            role,
            email,
            password,
            wallet_address: null, 
        });
        
        await user.save();

        const token = generateToken(user._id);

        res.status(200).json({
            token,
            user : {
                id: user._id,
                role: user.role,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
            }
        });
    } catch (err) {
        console.log("Error while signing up, ", err);
        res.status(500).json({
            message : "Server error"
        });
    }   
});
  
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ msg: "Please provide both email and password" });
      }
  
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid email or password" });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid email or password" });
      }
      
      const token = generateToken(user._id);

      res.status(200).json({ 
        token,
        user : {
            id: user._id,
            role: user.role,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }
    });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;