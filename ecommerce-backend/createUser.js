const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const User = require("./src/models/User") // Adjust path if your models folder is elsewhere

// Load environment variables
dotenv.config()

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    // Create a user
    const email = "test@example.com" // Replace with desired email
    const password = bcrypt.hashSync("Stanciuandrei11!", 10) // Replace with desired password
    console.log("Hashed password:", password)
    const newUser = new User({ email, password })
    await newUser.save()

    console.log("User created:", newUser)

    // Close connection
    mongoose.connection.close()
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err)
  })
