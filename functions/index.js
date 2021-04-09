const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")({ origin: true });

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors);

app.get("/rangers", async (req, res) => {
  try {
    const rangersRef = await db.collection("rangers").get();
    let rangers = [];
    rangersRef.forEach((doc) => {
      const rangerData = doc.data();
      rangers.push({
        id: doc.id,
        color: rangerData.color,
      });
    });
    res.json({ rangers });
  } catch (error) {
    logErrorToServer(error);
  }
});

app.post("/rangers", async (req, res) => {
  try {
    const { color } = req.body;
    const rangersRef = db.collection("rangers").doc();

    await rangersRef.set({
      color,
    });

    res.json({ id: rangersRef.id, color, success: true });
  } catch (error) {
    logErrorToServer(error);
  }
});

const logErrorToServer = (error) => console.log(error);

exports.app = functions.https.onRequest(app);
