import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';


export const stripeConnection = new Stripe(STRIPE_SECRET_KEY);


export function computeRentalAmounts(cartBasePrice: number, deliveryAmount: number, taxPercent: number) {
    const taxPercentDecimal = taxPercent > 0 ? taxPercent / 100 : 0;
    
    let basePrice = Math.round(cartBasePrice * 100);
    let deposit = Math.round(basePrice / 2);
    let tax = Math.round(basePrice * taxPercentDecimal);
    let delivery = Math.round(deliveryAmount * 100);
    let remaining = basePrice - deposit;
    let finalPayment = remaining + tax;
    let totalWithTax = basePrice + tax;

    tax = tax / 100;
    delivery = delivery / 100;
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
        delivery,
        finalPayment,
        totalWithTax
    };
}
