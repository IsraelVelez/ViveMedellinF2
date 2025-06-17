"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registro() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const handleRegistro = (e) => {
    e.preventDefault();

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (usuarios.find(u => u.email === email)) {
      setError("El email ya está registrado");
      return;
    }

    const nuevoUsuario = {
      id: Date.now().toString(),
      nombre,
      email,
      password,
      edad: "",
      intereses: "",
      ubicacion: "",
      bio: "",
      eventosGuardados: [],
      usuariosSeguidos: [],
      fechaRegistro: new Date().toISOString(),
      preferenciasNotificaciones: true,
      foto: "",
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    setMensaje("Registro exitoso. ¡Bienvenido a ViveMedellín!");
    setTimeout(() => router.push("/perfil"), 1500);
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleRegistro} style={{ maxWidth: "400px" }}>
        <label>Nombre:</label>
        <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} />
        <label>Email:</label>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        <label>Contraseña:</label>
        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
        <label>Confirmar Contraseña:</label>
        <input type="password" required value={confirmar} onChange={e => setConfirmar(e.target.value)} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
