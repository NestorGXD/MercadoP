export default function Escena({ destino }) {
  return (
    <div className="escena" style={{ background: `linear-gradient(${destino.cielo[0]}, ${destino.cielo[1]})` }} aria-hidden="true">
      <div className="sol" />
      <div className="agua dos" style={{ background: destino.mar }} />
      <div className="agua" style={{ background: destino.mar }} />
    </div>
  );
}
