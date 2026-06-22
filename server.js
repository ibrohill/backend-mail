require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dns = require("dns");

// Force la résolution DNS en IPv4 d'abord (corrige les soucis ENETUNREACH avec IPv6 sur Render)
dns.setDefaultResultOrder("ipv4first");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  const { nom, message } = req.body;

  try {
    await transporter.sendMail({
      from: `Depan-App <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "🚨 Nouvelle demande Dépan-App",
      html: message,
    });

    res.status(200).send("Email envoyé");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});