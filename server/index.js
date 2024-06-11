const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserRoutes = require('./routes/User')
const {resolve} = require("path");

const stripe = require("stripe")('sk_test_51OEX0MSBpQp3hyx4MsPXsaI31mYUQjBHzCUr8P43F6FzjbG0IktgxMZExg4hmc1C9cjohbpriT1ZfKKbnZgH7Jli00dbevCKMe', {
  apiVersion: "2022-08-01",
});

const app = express();
app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({ extended: true }));

app.use(express.static('../client'));

app.get("/", (req, res) => {
  const path = resolve('../client'+ "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: 'pk_test_51OEX0MSBpQp3hyx4D4LHIyAdG5VSZPm1ZdxPjrd7AbwHBw8VqJJaqHme1UKPuPhekNeADNgbswiuIIVwN8iWseQu00TQW3PyNr',
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "INR",
      amount: 99999,
      payment_method_types: ['card'],
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.use("/api/user/", UserRoutes)

// error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });


const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose
      .connect('mongodb://localhost:27017/tracker2')
      .then(() => console.log("Connected to Mongo DB"))
      .catch((err) => {
        console.error("failed to connect with mongo");
        console.error(err);
      });
  };

  const startServer = async () => {
    try {
      connectDB();
      app.listen(8080, () => console.log("Server started on port 8080"));
    } catch (error) {
      console.log(error);
    }
  };

  startServer();