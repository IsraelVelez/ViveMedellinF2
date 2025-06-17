import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a ViveMedellín</h1>
      <p>Explora eventos, conecta con personas y descubre
        lugares increíbles en la ciudad de la eterna primavera.</p>
      <Link href="/auth/login">Inicia sesión para comenzar</Link>
    </div>
  );
}
