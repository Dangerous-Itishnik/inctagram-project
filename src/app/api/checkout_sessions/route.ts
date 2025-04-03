import { stripe } from '@/app/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const product = await stripe.products.create({
      default_price_data: {
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
        unit_amount: 1000,
      },
      expand: ['default_price'],
      name: 'Basic Dashboard',
    })

    const price = await stripe.prices.create({
      currency: 'usd',
      // product: '{{PRODUCT_ID}}',
      product: product.id,
      recurring: {
        interval: 'month',
      },
      unit_amount: 1000,
    })

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      cancel_url: `${origin}/?canceled=true`,
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 })
  }
}
