require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CONFIG EMAIL (depuis les variables d'environnement)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ROUTE
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

// server : node server.js