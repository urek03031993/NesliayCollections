import Stripe from 'stripe';
import { STRIPE_TEST_SECRET_KEY } from '$env/static/private';


export const stripeConnection = new Stripe(STRIPE_TEST_SECRET_KEY);


export function computeRentalAmounts(total: number) {
    let basePrice = Math.round(total * 100);
    const deposit = Math.round(basePrice / 2) / 100;
    const remaining = (basePrice - deposit) / 100 ;
    const tax = Math.round(basePrice * 0.07) / 100;
    const finalPayment = (remaining + tax) / 100;
    basePrice = basePrice / 100;

    return {
        basePrice,
        deposit,
        remaining,
        tax,
        finalPayment,
        totalWithTax: basePrice + tax
    };
}
