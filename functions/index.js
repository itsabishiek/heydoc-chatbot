import axios from "axios";
import { API_VERSION } from "../constants/index.js";

export const handleOPGeneral = (phoneNoID, access_token, from) => {
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
        name: "op_general_template",
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
                payload: "kmc",
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
                payload: "apollo",
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
                payload: "gvn",
              },
            ],
          },
          {
            type: "button",
            sub_type: "quick_reply",
            index: "3",
            parameters: [
              {
                type: "payload",
                payload: "frontline",
              },
            ],
          },
          {
            type: "button",
            sub_type: "quick_reply",
            index: "4",
            parameters: [
              {
                type: "payload",
                payload: "sms",
              },
            ],
          },
          {
            type: "button",
            sub_type: "quick_reply",
            index: "5",
            parameters: [
              {
                type: "payload",
                payload: "srm",
              },
            ],
          },
          {
            type: "button",
            sub_type: "quick_reply",
            index: "6",
            parameters: [
              {
                type: "payload",
                payload: "sn",
              },
            ],
          },
          {
            type: "button",
            sub_type: "quick_reply",
            index: "7",
            parameters: [
              {
                type: "payload",
                payload: "bhel",
              },
            ],
          },
          {
            type: "button",
            sub_type: "quick_reply",
            index: "8",
            parameters: [
              {
                type: "payload",
                payload: "maruthi",
              },
            ],
          },
        ],
      },
    },
  });
};

export const handleAmbulance = (phoneNoID, access_token, from) => {
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
        name: "ambulance_template",
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
                payload: "babu",
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
                payload: "annai",
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
                payload: "apollo",
              },
            ],
          },
          {
            type: "button",
            sub_type: "quick_reply",
            index: "3",
            parameters: [
              {
                type: "payload",
                payload: "prabhu",
              },
            ],
          },
          {
            type: "button",
            sub_type: "quick_reply",
            index: "4",
            parameters: [
              {
                type: "payload",
                payload: "balaji",
              },
            ],
          },
        ],
      },
    },
  });
};
