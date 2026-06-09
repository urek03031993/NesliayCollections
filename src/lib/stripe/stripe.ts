import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';


export const stripeConnection = new Stripe(STRIPE_SECRET_KEY);


export function computeRentalAmounts(total: number) {
    let basePrice = Math.round(total * 100);
    let deposit = Math.round(basePrice / 2);
    let tax = Math.round(basePrice * 0.07);
    let remaining = basePrice - deposit;
    let finalPayment = remaining + tax;
    let totalWithTax = basePrice + tax;

    tax = tax / 100;
    deposit = deposit / 100
    basePrice = basePrice / 100;
    remaining = remaining / 100;
    finalPayment = finalPayment / 100;
    totalWithTax = totalWithTax / 100;


    return {
        basePrice,
        deposit,
        remaining,
        tax,
        finalPayment,
        totalWithTax
    };
}
