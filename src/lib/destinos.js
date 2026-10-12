// Catálogo en el servidor: el precio real NUNCA viene del navegador.
export const DESTINOS = {
  cancun: {
    id: "cancun",
    nombre: "Cancún y Riviera Maya",
    region: "Quintana Roo",
    dias: 5,
    precio: 8990,
    descripcion:
      "Playas de arena blanca, cenotes, ruinas de Tulum y un día completo en Isla Mujeres. Incluye hotel frente al mar con desayuno.",
    incluye: ["Vuelo redondo", "4 noches de hotel", "Tour a Tulum y cenotes", "Traslados"],
    cielo: ["#7fd6e8", "#f6e3b4"],
    mar: "#0f8aa3",
  },
  oaxaca: {
    id: "oaxaca",
    nombre: "Oaxaca de los sabores",
    region: "Oaxaca",
    dias: 4,
    precio: 5490,
    descripcion:
      "Mercados, mezcal, mole y Monte Albán. Clase de cocina tradicional y visita a Hierve el Agua.",
    incluye: ["Autobús de lujo", "3 noches de hotel boutique", "Clase de cocina", "Guía local"],
    cielo: ["#f4b860", "#e8715a"],
    mar: "#7a3b2e",
  },
  cabos: {
    id: "cabos",
    nombre: "Los Cabos al atardecer",
    region: "Baja California Sur",
    dias: 5,
    precio: 10800,
    descripcion:
      "El Arco, avistamiento de ballenas según temporada, snorkel en Santa María y cenas frente al Pacífico.",
    incluye: ["Vuelo redondo", "4 noches de hotel", "Paseo en barco", "Traslados"],
    cielo: ["#ffb36b", "#c9577a"],
    mar: "#233a73",
  },
  guanajuato: {
    id: "guanajuato",
    nombre: "Guanajuato colonial",
    region: "Guanajuato",
    dias: 3,
    precio: 3290,
    descripcion:
      "Callejones, callejoneadas con estudiantina, el Pípila y las minas. Perfecto para un fin de semana largo.",
    incluye: ["2 noches de hotel", "Callejoneada", "Tour de minas", "Desayunos"],
    cielo: ["#b9c6f2", "#f3d9b1"],
    mar: "#5b4a8a",
  },
};

export const formatoMXN = (n) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
