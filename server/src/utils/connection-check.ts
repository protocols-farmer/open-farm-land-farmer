//src/utils/connection-check.ts
import axios from "axios";
import { logger } from "@/config/logger.js";

export const checkExternalServices = async () => {
  const services = [
    { name: "Google OAuth", url: "https://oauth2.googleapis.com/token" },
    {
      name: "GitHub OAuth",
      url: "https://github.com/login/oauth/access_token",
    },
    { name: "Cloudinary API", url: "https://api.cloudinary.com/v1_1" },
  ];

  for (const service of services) {
    try {
      await axios.post(service.url, {}, { timeout: 5000 });
    } catch (error: any) {
      if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
        logger.error(`❌ ${service.name} is UNREACHABLE (Network Blocked)`);
      } else {
        logger.info(`✅ ${service.name} is Reachable`);
      }
    }
  }
};
