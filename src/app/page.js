import { DESTINOS, formatoMXN } from "@/lib/destinos";
import Escena from "@/components/Escena";

export default function Inicio() {
  return (
    <main>
      <section className="hero">
        <h1>Elige el destino. Nosotros armamos el viaje.</h1>
        <p>
          Paquetes por México con hotel, traslados y actividades incluidas. Reserva en línea y paga con
          Stripe o Mercado Pago.
        </p>
      </section>

      <section className="grid" aria-label="Destinos">
        {Object.values(DESTINOS).map((d) => (
          <article className="tarjeta" key={d.id}>
            <Escena destino={d} />
            <div className="tarjeta-cuerpo">
              <h2>{d.nombre}</h2>
              <p className="meta">{d.region}, {d.dias} días</p>
              <p>{d.descripcion}</p>
              <div className="tarjeta-pie">
                <div className="precio">
                  {formatoMXN(d.precio)}
                  <small>por persona</small>
                </div>
                <a className="boton" href={`/reservar/${d.id}`}>Reservar</a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
