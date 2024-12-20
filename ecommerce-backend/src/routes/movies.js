const express = require("express")
const Movie = require("../models/Movie")

const router = express.Router()

// Endpoint pentru adăugarea unui film
router.post("/", async (req, res) => {
  const { title, description } = req.body

  try {
    const newMovie = new Movie({
      title,
      description,
    })

    // Salvează filmul în baza de date
    await newMovie.save()
    res.status(201).json(newMovie) // Returnează filmul salvat
  } catch (error) {
    console.error("Error adding movie:", error)
    res.status(500).json({ message: "Eroare server" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
      return res.status(404).json({ message: "Film nu găsit" })
    }
    res.json(movie)
  } catch (error) {
    console.error("Error fetching movie:", error)
    res.status(500).json({ message: "Eroare server" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedMovie) {
      return res.status(404).json({ message: "Film nu găsit" })
    }
    res.json(updatedMovie) // Returnează filmul actualizat
  } catch (error) {
    console.error("Error updating movie:", error)
    res.status(500).json({ message: "Eroare server" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id)
    if (!deletedMovie) {
      return res.status(404).json({ message: "Film nu găsit" })
    }
    res.status(200).json({ message: "Film șters cu succes" })
  } catch (error) {
    console.error("Error deleting movie:", error)
    res.status(500).json({ message: "Eroare server" })
  }
})

// Endpoint pentru obținerea filmelor
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find()
    res.json(movies) // Returnează toate filmele
  } catch (error) {
    console.error("Error fetching movies:", error)
    res.status(500).json({ message: "Eroare server" })
  }
})

module.exports = router
