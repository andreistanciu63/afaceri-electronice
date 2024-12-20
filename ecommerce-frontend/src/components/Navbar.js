import React from "react"
import { Link, useLocation } from "react-router-dom"

const Navbar = ({ isAuthenticated, handleLogout, cartCount }) => {
  const location = useLocation() // Get the current location

  return (
    <nav className="navbar">
      <ul>
        {/* Show Login link only if the user is not on the /login page */}
        {!isAuthenticated && location.pathname !== "/login" && (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <>
            <li className="nav-item">
              <Link to="/movies" className="nav-link">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-movie" className="nav-link">
                Add movie
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-button" to="/cart">
                Cart ({cartCount})
              </Link>{" "}
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
