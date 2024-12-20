const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

// Endpoint pentru login
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  console.log("Request received:", { email, password })

  try {
    // Check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      console.log("User not found for email:", email)
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password)
    console.log("Password entered:", password)
    console.log("Hashed password in database:", user.password)
    console.log("Password verification result:", isMatch)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    console.log("Generated token:", token)

    return res.json({ token })
  } catch (err) {
    console.error("Error in login:", err)
    return res.status(500).json({ message: "Server error" })
  }
})
const authenticateToken = require("../middleware/auth")

router.get("/", authenticateToken, async (req, res) => {
  const movies = await Movie.find()
  res.json(movies)
})

module.exports = router
