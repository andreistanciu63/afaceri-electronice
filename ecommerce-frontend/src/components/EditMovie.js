import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const EditMovie = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/${id}`)
        const movie = await response.json()
        setTitle(movie.title)
        setDescription(movie.description)
      } catch (error) {
        console.error("Error fetching movie:", error)
      }
    }

    fetchMovie()
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()

    const updatedMovie = { title, description }

    try {
      const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      })

      if (response.ok) {
        alert("Film actualizat cu succes!")
        navigate("/movies") // Redirect back to movie list
      } else {
        alert("Eroare la actualizarea filmului")
      }
    } catch (error) {
      console.error("Error updating movie:", error)
      alert("Eroare de rețea")
    }
  }

  return (
    <div className="movie-form-container">
      <h1>Editează Film</h1>
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

        <button type="submit">Actualizează Film</button>
      </form>
    </div>
  )
}

export default EditMovie
