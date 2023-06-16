const stripe = require("stripe")(process.env.STRIPE_SK);

const createPayment = async (req, res) => {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.floor(req.query.price * 100),
        currency: "usd",
        // automatic_payment_methods: {
        //     enabled: true,
        // },
        payment_method_types: ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
};

module.exports = { createPayment };
