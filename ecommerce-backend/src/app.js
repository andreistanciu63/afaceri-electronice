const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const authRoutes = require("./routes/auth")
const movieRoutes = require("./routes/movies")

app.use("/api/auth", authRoutes)
app.use("/api/movies", movieRoutes)

require("dotenv").config()

const PORT = process.env.PORT || 5000

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://linuxreviewscontact:4CPeecwUguET9UIp@ecommerce.a3ri0.mongodb.net/"

// Conexiune la MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

module.exports = app
