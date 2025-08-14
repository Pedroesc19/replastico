import express from "express";
import stripe from "../utils/stripe.js";

const router = express.Router();

router.post("/session", async (req, res) => {
  try {
    const { order } = req.body;
    const lineItems = order.items.map((item) => ({
      price_data: {
        currency: "mxn",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

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

