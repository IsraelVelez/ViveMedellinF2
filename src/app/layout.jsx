export const metadata = {
  title: "ViveMedellín - Descubre y participa",
  description: "Plataforma inteligente para el descubrimiento y recomendación de actividades locales en Medellín.",
  icons: {
    icon: "/icon.png",
  },
};

import '../styles/globals.css';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
