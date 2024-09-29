import { stripe } from "@/lib/stripe";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { priceId } = req.body

    if (req.method !== 'POST') {
        res.status(405).json({ err: 'Method not allowed' })
    }

    if (!priceId) {
        res.status(400).json({ err: 'Price not found' })
    }


    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}/`
    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'subscription',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            }
        ]
    })

    return res.status(201).json({
        checkoutUrl: checkoutSession.url
    })
}

// Enviar alerta de erro caso o parametro não venha na rota
// Enviar alerta de erro caso o metodo da consulta seja diferente do implementado. O next não faz distinção de
// metodos get, post, delete, update na rota.

