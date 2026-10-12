import Stripe from "stripe";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";
import { DESTINOS } from "@/lib/destinos";

export async function POST(request) {
  try {
    const { destinoId, personas, proveedor, nombre } = await request.json();

    const destino = DESTINOS[destinoId];
    const cantidad = Number(personas);
    if (!destino) return NextResponse.json({ error: "Destino no válido." }, { status: 400 });
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 10)
      return NextResponse.json({ error: "Número de viajeros no válido." }, { status: 400 });

    const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const titulo = `${destino.nombre} (${destino.dias} días)`;
    const referencia = `reserva-${destino.id}-${Date.now()}`;

    // ---------- STRIPE ----------
    if (proveedor === "stripe") {
      if (!process.env.STRIPE_SECRET_KEY)
        return NextResponse.json({ error: "Falta STRIPE_SECRET_KEY en .env.local" }, { status: 500 });

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            quantity: cantidad,
            price_data: {
              currency: "mxn",
              unit_amount: destino.precio * 100, // Stripe usa centavos
              product_data: { name: titulo },
            },
          },
        ],
        metadata: { destino: destino.id, viajero: String(nombre || ""), referencia },
        success_url: `${base}/pago-exitoso?proveedor=stripe`,
        cancel_url: `${base}/pago-error?proveedor=stripe`,
      });
      return NextResponse.json({ url: session.url });
    }

    // ---------- MERCADO PAGO ----------
    if (proveedor === "mercadopago") {
      if (!process.env.MERCADOPAGO_ACCESS_TOKEN)
        return NextResponse.json({ error: "Falta MERCADOPAGO_ACCESS_TOKEN en .env.local" }, { status: 500 });

      const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
      const preference = new Preference(client);

      const body = {
        items: [
          {
            id: destino.id,
            title: titulo,
            quantity: cantidad,
            currency_id: "MXN",
            unit_price: destino.precio, // en pesos, NO en centavos
          },
        ],
        back_urls: {
          success: `${base}/pago-exitoso?proveedor=mercadopago`,
          failure: `${base}/pago-error?proveedor=mercadopago`,
          pending: `${base}/pago-pendiente?proveedor=mercadopago`,
        },
        external_reference: referencia,
        metadata: { viajero: String(nombre || "") },
      };
      // Mercado Pago rechaza auto_return con URLs http://localhost
      if (base.startsWith("https://")) body.auto_return = "approved";

      const respuesta = await preference.create({ body });
      return NextResponse.json({ url: respuesta.init_point });
    }

    return NextResponse.json({ error: "Método de pago no válido." }, { status: 400 });
  } catch (error) {
    console.error("Error en checkout:", error);
    return NextResponse.json({ error: "No se pudo crear el pago. Revisa la consola del servidor." }, { status: 500 });
  }
}
