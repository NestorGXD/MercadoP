export default function PagoError() {
  return (
    <main className="resultado">
      <h1>No se completó el pago</h1>
      <p>El pago falló o lo cancelaste. No se hizo ningún cargo. Puedes intentarlo de nuevo con el mismo u otro método de pago.</p>
      <div className="acciones">
        <a className="boton" href="/">Volver a los destinos</a>
      </div>
    </main>
  );
}
