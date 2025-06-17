"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("usuario");
    if (u) setUsuario(JSON.parse(u));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.location.href = "/auth/login";
  };

  return (
    <nav>
      <div className="container nav-container">
        <Link href="/" className="nav-logo" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Image src="/logo.jpg" alt="Logo ViveMedellín" width={36} height={36} />
          ViveMedellín
        </Link>
        <div className="nav-links">
          <Link href="/">Inicio</Link>
          {usuario ? (
            <>
              <Link href="/perfil">Mi Perfil</Link>
              <Link href="/admin/reporte">Usuarios Activos</Link>
              <button className="nav-button" onClick={cerrarSesion}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link href="/auth/login">Iniciar Sesión</Link>
              <Link href="/auth/registro">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
