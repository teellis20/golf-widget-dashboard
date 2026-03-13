import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST(req) {
    try {

        const headersList = await headers()
        const origin = headersList.get('origin')
        const { plan } = await req.json();

        const price_id = plan === 'monthly'
            // ? 'price_1T9vqRA35cCP4cITrFKzImW9' //35
            // : 'price_1TAJZzA35cCP4cITUl40D2R4' //350
            ? 'price_1TAMBBA35cCP4cITiET6qcoX' //39
            : 'price_1TALENA35cCP4cIT6UVUdk7E' //390
        // console.log('price-id: ', price_id)

        // Create Checkout Sessions from body params
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: price_id,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/billing`,
            subscription_data: {
                trial_period_days: 7
            },
              branding_settings: {
                // logo: "https://taylor-ellis.com/widget-splash/logo.png",
                // icon: "https://taylor-ellis.com/widget-splash/assets/icon-C3yQLCSg.png",
                background_color: "#ffffff",
                button_color: "#15803d",
                display_name: 'Clubhouse Caddie'
            },
            custom_text: {
                submit: {
                    message: 'Keep your golfers informed with real-time course updates.'
                }
            },
            

        });
        console.log('SESSION: ', session)
        // return NextResponse.redirect(session.url, 303)
        return Response.json({ url: session.url })
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}