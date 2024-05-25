import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import webhookRoute from "./routes/webhook.route.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("HeyDoc!!!");
});

app.use("/webhook", webhookRoute);

app.listen(PORT, () => {
  console.log(`Server started on port: http://localhost:${PORT}`);
});
