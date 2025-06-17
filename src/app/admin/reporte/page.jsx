"use client";
import { useEffect, useState } from "react";

export default function ReporteUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("usuarios") || "[]");
    setUsuarios(u);
  }, []);

  if (usuarios.length === 0) {
    return <p>No hay usuarios registrados.</p>;
  }

  return (
    <div>
      <h2>Reporte de Usuarios Activos</h2>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha de Registro</th>
            <th>Intereses</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{new Date(u.fechaRegistro).toLocaleDateString()}</td>
              <td>{u.intereses || "No especificados"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
