//src/config/mailgun.ts
import formData from "form-data";
import Mailgun from "mailgun.js";
import { config } from "./index.js";

const mailgun = new Mailgun(formData);

export const mg = mailgun.client({
  username: "api",
  key: config.mailgun.apiKey,
});
