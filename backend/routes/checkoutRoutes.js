import express from "express";
import stripe from "../utils/stripe.js";

const router = express.Router();

router.post("/session", async (req, res) => {
  try {
    // TODO: validate and price items using your own data
    const lineItems = [{
      price_data: {
        currency: "usd",
        product_data: { name: "Awesome Product" },
        unit_amount: 2000,
      },
      quantity: 1,
    }];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Create session failed:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

