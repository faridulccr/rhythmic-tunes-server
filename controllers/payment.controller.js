const stripe = require("stripe")(process.env.STRIPE_SK);

const createPayment = async (req, res) => {
    // Create a PaymentIntent with the order amount and currency
    const { client_secret } = await stripe.paymentIntents.create({
        amount: parseFloat(req.query.price),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({ clientSecret: client_secret });
};

module.exports = { createPayment };
