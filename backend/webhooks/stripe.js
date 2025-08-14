import express from "express";
import stripe from "../utils/stripe.js";

const router = express.Router();

router.post("/stripe", (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      // TODO: mark order paid using session.id or metadata
      console.log("✅ Payment succeeded for session:", session.id);
      break;
    }
    default:
      break;
  }

  res.json({ received: true });
});

export default router;

