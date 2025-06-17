"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UsuarioPublico() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const u = usuarios.find(u => u.id === id);
    setUsuario(u || null);
  }, [id]);

  if (!usuario) {
    return <p>Usuario no encontrado.</p>;
  }

  return (
    <div>
      <h2>Perfil de {usuario.nombre}</h2>
      <img src={usuario.foto || "/default-profile.png"} alt="Foto de perfil" width={120} height={120} />
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Edad:</strong> {usuario.edad || "No especificado"}</p>
      <p><strong>Intereses:</strong> {usuario.intereses || "No especificados"}</p>
      <p><strong>Ubicación:</strong> {usuario.ubicacion || "No especificada"}</p>
      <p><strong>Biografía:</strong> {usuario.bio || "No especificada"}</p>
    </div>
  );
}
