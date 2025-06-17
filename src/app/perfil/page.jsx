"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("usuario");
    if (u) setUsuario(JSON.parse(u));
  }, []);

  if (!usuario) {
    return (
      <div className="perfil-container">
        <p>No has iniciado sesión.</p>
        <Link href="/auth/login" className="perfil-boton">Inicia sesión</Link>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <h2>Mi Perfil</h2>
      <img src={usuario.foto || "/default-profile.png"} alt="Foto de perfil" className="perfil-foto" />
      <div className="perfil-info">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Edad:</strong> {usuario.edad || "No especificado"}</p>
        <p><strong>Intereses:</strong> {usuario.intereses || "No especificados"}</p>
        <p><strong>Ubicación:</strong> {usuario.ubicacion || "No especificada"}</p>
        <p><strong>Biografía:</strong> {usuario.bio || "No especificada"}</p>
        <p><strong>Preferencias de notificación:</strong> {usuario.preferenciasNotificaciones ? "Activadas" : "Desactivadas"}</p>
      </div>
      <div className="perfil-acciones">
        <Link href="/perfil/editar" className="perfil-boton">Editar Perfil</Link>
        <EliminarCuenta />
      </div>
    </div>
  );
}

function EliminarCuenta() {
  const handleEliminar = () => {
    if (confirm("¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
      usuarios = usuarios.filter(u => u.email !== usuario.email);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.removeItem("usuario");
      alert("Cuenta eliminada.");
      window.location.href = "/";
    }
  };

  return (
    <button className="perfil-boton" style={{ backgroundColor: "#d93025" }} onClick={handleEliminar}>
      Eliminar Cuenta
    </button>
  );
}
