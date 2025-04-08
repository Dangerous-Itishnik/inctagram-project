import { stripe } from '@/app/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    // const { subscriptions } = await req.json()
    const product = await stripe.products.create({
      default_price_data: {
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
        unit_amount: 1000,
      },
      expand: ['default_price'],
      name: 'per 1 Day',
    })

    const price = await stripe.prices.create({
      currency: 'usd',
      // product: '{{PRODUCT_ID}}',
      product: product.id,
      recurring: {
        interval: 'day',
      },
      unit_amount: 1000,
    })

    const session = await stripe.checkout.sessions.create({
      cancel_url: `${origin}/?canceled=true`,
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price.id,
          // price: subscription.items.map(price => price.price),
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

// const prices = await Promise.all([
//   stripe.prices.create({
//     currency: 'usd',
//     product: product.id,
//     recurring: {
//       interval: 'day',
//     },
//     unit_amount: 1000,
//   }),
//   stripe.prices.create({
//     currency: 'usd',
//     product: product.id,
//     recurring: {
//       interval: 'day',
//     },
//     unit_amount: 5000,
//   }),
//   stripe.prices.create({
//     currency: 'usd',
//     product: product.id,
//     recurring: {
//       interval: 'month',
//     },
//     unit_amount: 1000,
//   }),
// ])

// const lineItems = subscriptions.map(subscription => {
//   let unitAmount
//
//   switch (subscription.type) {
//     case '10':
//       unitAmount = 1000 // $10
//       break
//     case '50':
//       unitAmount = 5000 // $50
//       break
//     case '100':
//       unitAmount = 10000 // $100
//       break
//     default:
//       throw new Error('Invalid subscription type')
//   }
//
//   return {
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: `Subscription ${subscription.type}`,
//       },
//       recurring: {
//         // interval: subscription.interval || 'month', // Можно указать интервал
//         interval: 'month', // Можно указать интервал
//       },
//       unit_amount: unitAmount,
//     },
//     quantity: subscription.quantity || 1, // Количество
//   }
// })
// Create Checkout Sessions from body params.
// line_items: prices.map(price => ({
//   price: price.id,
//   quantity: 1,
// })),
// line_items: lineItems,
