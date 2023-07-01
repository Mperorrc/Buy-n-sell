import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_PUBLIC_KEY!!,{
    apiVersion: '2022-11-15',
});

export const checkOutSession = async(req:any,res:any)=>{
    const body = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        success_url:`http://localhost:3000/me/orders?order_success=true`,
        cancel_url:`http://localhost:3000`,
    })
}