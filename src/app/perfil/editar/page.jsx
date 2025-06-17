"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditarPerfil() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [intereses, setIntereses] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [bio, setBio] = useState("");
  const [preferenciasNotificaciones, setPreferenciasNotificaciones] = useState(true);
  const [foto, setFoto] = useState("");
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("usuario");
    if (u) {
      const userObj = JSON.parse(u);
      setUsuario(userObj);
      setNombre(userObj.nombre || "");
      setEdad(userObj.edad || "");
      setIntereses(userObj.intereses || "");
      setUbicacion(userObj.ubicacion || "");
      setBio(userObj.bio || "");
      setPreferenciasNotificaciones(userObj.preferenciasNotificaciones ?? true);
      setFoto(userObj.foto || "");
    }
  }, []);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const guardarCambios = (e) => {
    e.preventDefault();
    const actualizado = {
      ...usuario,
      nombre,
      edad,
      intereses,
      ubicacion,
      bio,
      preferenciasNotificaciones,
      foto,
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios = usuarios.map(u => (u.email === actualizado.email ? actualizado : u));
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuario", JSON.stringify(actualizado));
    setMensaje("Perfil actualizado correctamente");
    setTimeout(() => router.push("/perfil"), 1200);
  };

  if (!usuario) {
    return <p className="perfil-container">Cargando...</p>;
  }

  return (
    <div className="perfil-container">
      <h2>Editar Perfil</h2>
      {mensaje && <div className="alerta-exito">{mensaje}</div>}
      <form className="perfil-form" onSubmit={guardarCambios}>
        <label>Nombre:</label>
        <input value={nombre} onChange={e => setNombre(e.target.value)} required />

        <label>Edad:</label>
        <input type="number" value={edad} onChange={e => setEdad(e.target.value)} />

        <label>Intereses (separados por comas):</label>
        <input value={intereses} onChange={e => setIntereses(e.target.value)} />

        <label>Ubicación:</label>
        <input value={ubicacion} onChange={e => setUbicacion(e.target.value)} />

        <label>Biografía:</label>
        <textarea value={bio} onChange={e => setBio(e.target.value)} />

        <label>Preferencias de notificación:</label>
        <select value={preferenciasNotificaciones} onChange={e => setPreferenciasNotificaciones(e.target.value === "true")}>
          <option value="true">Activadas</option>
          <option value="false">Desactivadas</option>
        </select>

        <label>Foto de perfil:</label>
        <input type="file" accept="image/*" onChange={handleFotoChange} />
        {foto && <img src={foto} alt="Foto de perfil" className="perfil-foto" style={{ marginTop: "0.5rem" }} />}

        <div className="perfil-acciones">
          <button type="submit" className="perfil-boton">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}
