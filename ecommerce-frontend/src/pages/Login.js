import React, { useState } from "react"
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      )

      // Dacă autentificarea are succes, stochează token-ul în localStorage
      localStorage.setItem("token", response.data.token)

      // Poți redirecționa utilizatorul într-o altă pagină, cum ar fi pagina de filme
      window.location.href = "/movies"
    } catch (err) {
      setError("Email sau parolă incorecte")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Parola:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Autentificare..." : "Autentificare"}
        </button>
      </form>
    </div>
  )
}

export default Login
