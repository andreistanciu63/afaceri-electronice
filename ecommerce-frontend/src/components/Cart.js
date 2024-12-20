import React, { useState, useEffect } from "react"

const Cart = ({ cart, onRemoveFromCart }) => {
  const [cartMovies, setCartMovies] = useState([])

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    setCartMovies(savedCart)
  }, [])

  const handleDeleteAll = () => {
    setCartMovies([]) // Clear local state
    localStorage.setItem("cart", JSON.stringify([])) // Clear localStorage
    // Notify the parent component to clear the cart globally if needed
    if (onRemoveFromCart) {
      cart.forEach(movie => onRemoveFromCart(movie._id))
    }
  }

  return (
    <div className="movie-list">
      <h1>Your Cart</h1>
      {cartMovies.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <button onClick={handleDeleteAll} className="delete-button">
            Delete All Movies
          </button>
          <div className="movie-list-items">
            {cartMovies.map(movie => (
              <div key={movie._id} className="movie-item">
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
