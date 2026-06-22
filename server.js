const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CONFIG EMAIL
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ibrohillb@gmail.com",
    pass: "cdzfwqxhtyowbdcc"
  }
});

// ROUTE
app.post("/send-email", async (req, res) => {
  const { nom, message } = req.body;

  try {
    await transporter.sendMail({
        from: "Depan-App <ibrohillb@gmail.com>",
        to: "ibocoum@groupeisi.com",
        subject: "🚨 Nouvelle demande Dépan-App",
        html: message, 
    });

    res.status(200).send("Email envoyé");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur");
  }
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});

// server : node server.js