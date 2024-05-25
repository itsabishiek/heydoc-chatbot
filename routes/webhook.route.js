import { Router } from "express";
import { getWebhook, postWebhook } from "../controllers/webhook.controller.js";

const router = Router();

router.get("/", getWebhook);
router.post("/", postWebhook);

export default router;
