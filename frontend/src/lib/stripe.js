import { loadStripe } from "@stripe/stripe-js";

const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) console.warn("Missing REACT_APP_STRIPE_PUBLISHABLE_KEY");

export const stripePromise = loadStripe(publishableKey);
