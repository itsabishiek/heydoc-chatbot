const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const token = process.env.WEBHOOK_TOKEN;
const access_token = process.env.ACCESS_TOKEN;

app.get("/", (req, res) => {
  res.send("HeyDoc!!!");
});

app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let verifyToken = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && verifyToken === token) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(400);
    }
  }
});

app.post("/webhook", (req, res) => {
  let body = req.body;

  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      let phoneNoID = body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body.entry[0].changes[0].value.messages[0].from;
      let msyBody = body.entry[0].changes[0].value.messages[0].text.body;

      console.log(JSON.stringify(body_param, null, 2));
      console.log("TYPE", body.type);
      console.log("PAYLOAD", body.payload);

      axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${phoneNoID}/messages?access_token=${access_token}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          messaging_product: "whatsapp",
          to: from,
          type: "template",
          template: {
            name: "heydoc_template",
            language: {
              code: "en_US",
            },
          },
          components: [
            {
              type: "button",
              sub_type: "quick_reply",
              index: "0",
              parameters: [
                {
                  type: "payload",
                  payload: "emergency_services",
                },
              ],
            },
            {
              type: "button",
              sub_type: "quick_reply",
              index: "1",
              parameters: [
                {
                  type: "payload",
                  payload: "op_consultation",
                },
              ],
            },
            {
              type: "button",
              sub_type: "quick_reply",
              index: "2",
              parameters: [
                {
                  type: "payload",
                  payload: "medical_services",
                },
              ],
            },
          ],
        },
      });

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port: http://localhost:${PORT}`);
});
