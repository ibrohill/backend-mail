require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { BrevoClient } = require("@getbrevo/brevo");

const app = express();
app.use(cors());
app.use(express.json());

// Configuration Brevo (v5)
const brevoClient = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

app.post("/send-email", async (req, res) => {
  const { nom, message } = req.body;

  try {
    await brevoClient.transactionalEmails.sendTransacEmail({
      htmlContent: message,
      sender: {
        name: "Depan-App",
        email: process.env.EMAIL_USER,
      },
      subject: "🚨 Nouvelle demande Dépan-App",
      to: [
        {
          email: process.env.EMAIL_TO,
        },
      ],
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