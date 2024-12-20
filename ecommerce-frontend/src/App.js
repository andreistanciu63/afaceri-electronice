import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import Navbar from "./components/Navbar"
import MovieList from "./components/Movielist"
import MovieForm from "./components/Movieform"
import Login from "./components/Login"
import EditMovie from "./components/EditMovie"
import Cart from "./components/Cart"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [cart, setCart] = useState([])

  // Check if a valid token exists when the app is loaded
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    setCart(savedCart)
  }, [])

  const handleLogin = token => {
    // Save the JWT token to localStorage
    localStorage.setItem("token", token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("token")
    setIsAuthenticated(false)
  }

  const handleAddToCart = movie => {
    const updatedCart = [...cart, movie]
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart)) // Persist cart in localStorage
  }

  const handleRemoveFromCart = movieId => {
    // Remove the movie with the matching ID
    console.log("Removing from global cart:", movieId)
    const updatedCart = cart.filter(movie => movie._id !== movieId)
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart)) // Update localStorage
  }

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        cartCount={cart.length}
      />
      <Routes>
        {/* Redirect automatically to /login if not authenticated */}
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </>
        ) : (
          <>
            <Route
              path="/movies"
              element={<MovieList onAddToCart={handleAddToCart} />}
            />
            <Route path="/add-movie" element={<MovieForm />} />
            <Route
              path="/cart"
              element={
                <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
              }
            />

            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="/edit-movie/:id" element={<EditMovie />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
