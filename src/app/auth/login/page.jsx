"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

    if (usuarioEncontrado) {
      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
      router.push("/perfil");
    } else {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} style={{ maxWidth: "400px" }}>
        <label>Email:</label>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        <label>Contraseña:</label>
        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
