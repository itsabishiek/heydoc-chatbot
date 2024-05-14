import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { getLocationDetails } from "./utils/map.js";
import {
  API_VERSION,
  GENERAL,
  PEDIATRICIAN,
  SPECIALIST,
} from "./constants/index.js";
import { extractDoctorName } from "./utils/index.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
  let body = req?.body;

  if (body?.object) {
    if (
      body?.entry &&
      body?.entry[0].changes &&
      body?.entry[0].changes[0].value.messages &&
      body?.entry[0].changes[0].value.messages[0]
    ) {
      let phoneNoID = body?.entry[0].changes[0].value.metadata.phone_number_id;
      let name = body?.entry[0].changes[0].value.contacts[0].profile.name;
      let from = body?.entry[0].changes[0].value.messages[0].from;
      let payload =
        body?.entry[0]?.changes[0]?.value?.messages[0]?.button?.payload;

      console.log(JSON.stringify(body, null, 2));

      if (payload !== undefined) {
        switch (payload) {
          case "emergency_services":
            // Handle Emergency services
            axios({
              method: "POST",
              url: `https://graph.facebook.com/${API_VERSION}/${phoneNoID}/messages?access_token=${access_token}`,
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                text: {
                  body: "Use this link to connect to nearby doctors: https://call.whatsapp.com/video/VFwExVrL7596r9JmOCho7w",
                },
              },
            });

            res.sendStatus(200);
            break;
          case "op_consultation":
            // Handle OP Consultation
            axios({
              method: "POST",
              url: `https://graph.facebook.com/${API_VERSION}/${phoneNoID}/messages?access_token=${access_token}`,
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                type: "template",
                template: {
                  name: "op_template",
                  language: {
                    code: "en_US",
                  },
                  components: [
                    {
                      type: "button",
                      sub_type: "quick_reply",
                      index: "0",
                      parameters: [
                        {
                          type: "payload",
                          payload: "op_general",
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
                          payload: "op_pediatrician",
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
                          payload: "op_specialist",
                        },
                      ],
                    },
                  ],
                },
              },
            });

            res.sendStatus(200);
            break;
          case "op_general":
            // Handle Op General option
            axios({
              method: "POST",
              url: `https://graph.facebook.com/${API_VERSION}/${phoneNoID}/messages?access_token=${access_token}`,
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                text: {
                  body: `
                    Here are the list of doctors nearby,\n ${extractDoctorName(
                      GENERAL
                    )}\n Choose the doctor by providing the serial no.(eg: 1)
                  `,
                },
              },
            });

            res.sendStatus(200);
            break;
          case "op_pediatrician":
            // Handle Op General option
            axios({
              method: "POST",
              url: `https://graph.facebook.com/${API_VERSION}/${phoneNoID}/messages?access_token=${access_token}`,
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                text: {
                  body: `
                    Here are the list of doctors nearby,\n ${extractDoctorName(
                      PEDIATRICIAN
                    )}\n Choose the doctor by providing the serial no.(eg: 1)
                  `,
                },
              },
            });

            res.sendStatus(200);
            break;
          case "op_specialist":
            // Handle Op General option
            axios({
              method: "POST",
              url: `https://graph.facebook.com/${API_VERSION}/${phoneNoID}/messages?access_token=${access_token}`,
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                text: {
                  body: `
                    Here are the list of doctors nearby,\n ${extractDoctorName(
                      SPECIALIST
                    )}\n Choose the doctor by providing the serial no.(eg: 1)
                  `,
                },
              },
            });

            res.sendStatus(200);
            break;
          case "ambulance_services":
            // Handle Ambulance services
            axios({
              method: "POST",
              url: `https://graph.facebook.com/${API_VERSION}/${phoneNoID}/messages?access_token=${access_token}`,
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                text: {
                  body: "Here is your Ambulance Services link...",
                },
              },
            });

            res.sendStatus(200);
            break;
          default:
            break;
        }

        return;
      }

      if (body?.entry[0].changes[0].value.messages[0].type === "location") {
        let latitude =
          body?.entry[0].changes[0].value.messages[0].location.latitude;
        let longitude =
          body?.entry[0].changes[0].value.messages[0].location.longitude;

        getLocationDetails(latitude, longitude)
          .then((location) => {
            axios({
              method: "POST",
              url: `https://graph.facebook.com/${API_VERSION}/${phoneNoID}/messages?access_token=${access_token}`,
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                text: {
                  body: `Your location is near ${location}`,
                },
              },
            });

            res.sendStatus(200);
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      }

      if (body?.entry[0].changes[0].value.messages[0].type === "text") {
        axios({
          method: "POST",
          url: `https://graph.facebook.com/${API_VERSION}/${phoneNoID}/messages?access_token=${access_token}`,
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
              components: [
                {
                  type: "body",
                  parameters: [
                    {
                      type: "text",
                      text: name,
                    },
                  ],
                },
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
                      payload: "ambulance_services",
                    },
                  ],
                },
              ],
            },
          },
        });

        res.sendStatus(200);
      }
    } else {
      // console.log("NO BODY");
      res.sendStatus(404);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port: http://localhost:${PORT}`);
});
