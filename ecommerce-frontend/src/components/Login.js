import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom" // Importing useNavigate hook

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate() // Using navigate hook
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      )

      // Save the JWT token from response
      onLogin(response.data.token)
      navigate("/movies") // Pass token back to App.js
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    }
  }

  return (
    <div className="login-container">
      <h2 className="cyberpunk-title">Acces cont</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  )
}

export default Login
