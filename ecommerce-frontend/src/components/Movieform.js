import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const MovieForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const movie = { title, description }

    try {
      const response = await fetch("http://localhost:5000/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      })

      if (response.ok) {
        alert("Film adăugat cu succes!")
        setTitle("")
        setDescription("")
        navigate("/movies")
      } else {
        alert("Eroare la adăugarea filmului")
      }
    } catch (error) {
      console.error("Error adding movie:", error)
      alert("Eroare de rețea")
    }
  }

  return (
    <div className="movie-form-container">
      <h1>Adaugă un Film</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titlu</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descriere</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adaugă Film</button>
      </form>
    </div>
  )
}

export default MovieForm
