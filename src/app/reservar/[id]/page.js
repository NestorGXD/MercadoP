"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { DESTINOS, formatoMXN } from "@/lib/destinos";
import Escena from "@/components/Escena";

export default function Reservar() {
  const { id } = useParams();
  const destino = DESTINOS[id];

  const [nombre, setNombre] = useState("");
  const [personas, setPersonas] = useState(1);
  const [proveedor, setProveedor] = useState("stripe");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  if (!destino) {
    return (
      <main className="resultado">
        <h1>Destino no encontrado</h1>
        <a className="boton" href="/">Ver destinos</a>
      </main>
    );
  }

  const total = destino.precio * personas;

  async function pagar(e) {
    e.preventDefault();
    setError("");
    if (!nombre.trim()) return setError("Escribe el nombre del viajero principal.");

    setCargando(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinoId: destino.id, personas, proveedor, nombre }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "No se pudo iniciar el pago.");
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  }

  return (
    <main className="reserva">
      <section>
        <Escena destino={destino} />
        <h1>{destino.nombre}</h1>
        <p className="meta">{destino.region}, {destino.dias} días</p>
        <p style={{ marginTop: 12 }}>{destino.descripcion}</p>
        <ul className="incluye">
          {destino.incluye.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </section>

      <form className="panel" onSubmit={pagar}>
        <div className="campo">
          <label htmlFor="nombre">Nombre del viajero principal</label>
          <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div className="campo">
          <label htmlFor="personas">Número de viajeros</label>
          <input
            id="personas" type="number" min="1" max="10" value={personas}
            onChange={(e) => setPersonas(Math.min(10, Math.max(1, Number(e.target.value) || 1)))}
          />
        </div>

        <fieldset className="campo">
          <legend>Método de pago</legend>
          <label className="opcion">
            <input type="radio" name="proveedor" value="stripe" checked={proveedor === "stripe"} onChange={() => setProveedor("stripe")} />
            <div><b>Stripe</b><span>Tarjeta de crédito o débito</span></div>
          </label>
          <label className="opcion">
            <input type="radio" name="proveedor" value="mercadopago" checked={proveedor === "mercadopago"} onChange={() => setProveedor("mercadopago")} />
            <div><b>Mercado Pago</b><span>Tarjeta, saldo o efectivo</span></div>
          </label>
        </fieldset>

        <div className="total">
          <span>Total ({personas} {personas === 1 ? "viajero" : "viajeros"})</span>
          <strong>{formatoMXN(total)}</strong>
        </div>

        {error && <p className="error" role="alert">{error}</p>}

        <button className="boton sol ancho" type="submit" disabled={cargando}>
          {cargando ? "Redirigiendo al pago..." : `Pagar con ${proveedor === "stripe" ? "Stripe" : "Mercado Pago"}`}
        </button>
        <a href="/" className="meta">Volver a los destinos</a>
      </form>
    </main>
  );
}
