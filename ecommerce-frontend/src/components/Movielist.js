import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const MovieList = ({ onAddToCart }) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies")
        const data = await response.json()
        setMovies(data)
      } catch (error) {
        console.error("Error fetching movies:", error)
      }
    }

    fetchMovies()
  }, [])

  const handleDelete = async id => {
    try {
      const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        alert("Film șters cu succes!")
        setMovies(movies.filter(movie => movie._id !== id)) // Update movie list
      } else {
        alert("Eroare la ștergerea filmului")
      }
    } catch (error) {
      console.error("Error deleting movie:", error)
      alert("Eroare de rețea")
    }
  }

  const handleAddToCart = movie => {
    onAddToCart(movie)
  }

  return (
    <div className="movie-list">
      <h1>Lista Filme</h1>
      <ul className="movie-list-items">
        {movies.length > 0 ? (
          movies.map(movie => (
            <li key={movie._id} className="movie-item">
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
              <div className="movie-buttons">
                <Link to={`/edit-movie/${movie._id}`}>
                  <button className="edit-button">Editează</button>
                </Link>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="delete-button"
                >
                  Șterge
                </button>
                <button
                  onClick={() => handleAddToCart(movie)}
                  className="mark-button"
                >
                  Mark
                </button>{" "}
                {/* Add button to mark movie */}
              </div>
            </li>
          ))
        ) : (
          <p></p>
        )}
      </ul>
    </div>
  )
}

export default MovieList
