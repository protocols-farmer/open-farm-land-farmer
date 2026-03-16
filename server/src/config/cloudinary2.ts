// src/config/cloudinary.ts

import {
  v2 as cloudinaryV2,
  UploadApiResponse,
  UploadApiOptions,
  DeleteApiResponse,
} from "cloudinary";
import fs from "fs/promises";
import { config } from "./index.js";
import { logger } from "./logger.js";

cloudinaryV2.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
  secure: true,
});

logger.info("✅ Cloudinary configured successfully.");

/**
 * Uploads a file to Cloudinary and deletes the local temporary file.
 */
export const uploadToCloudinary = async (
  filePath: string,
  folder: string,
  publicId?: string,
): Promise<UploadApiResponse> => {
  const uploadOptions: UploadApiOptions = {
    folder: folder,
    // 🚜 UPDATED: Changed from "auto" to "image" to prevent non-image uploads
    resource_type: "image",
    // overwrite: true is used with a specific public_id to replace old files
    ...(publicId && { public_id: publicId, overwrite: true }),
  };

  try {
    const result = await cloudinaryV2.uploader.upload(filePath, uploadOptions);
    logger.info(
      { public_id: result.public_id, url: result.secure_url },
      "File successfully uploaded to Cloudinary",
    );
    return result;
  } catch (error) {
    logger.error({ err: error }, "Cloudinary Upload Error");
    throw error;
  } finally {
    // ALWAYS delete the file from the local 'uploads/images_temp' folder
    // to prevent server storage from filling up.
    try {
      await fs.unlink(filePath);
      logger.debug({ filePath }, "Temporary local file deleted.");
    } catch (unlinkErr) {
      logger.warn(
        { err: unlinkErr, filePath },
        "Non-critical: Failed to delete temporary local file. It may have been moved or already deleted.",
      );
    }
  }
};

/**
 * Deletes an asset from Cloudinary using its public_id.
 */
export const deleteFromCloudinary = async (
  publicId: string,
): Promise<DeleteApiResponse> => {
  try {
    const result = await cloudinaryV2.uploader.destroy(publicId, {
      resource_type: "image",
    });
    logger.info(
      { publicId, result: result.result },
      "Asset successfully deleted from Cloudinary",
    );
    return result;
  } catch (error) {
    logger.error({ err: error, publicId }, "Cloudinary Deletion Error");
    throw error;
  }
};

/**
 * Helper to extract public_id from a Cloudinary URL.
 */
export const extractPublicIdFromUrl = (url: string): string | null => {
  try {
    // 🚜 UPDATED: Replaced manual splitting with a robust Regex
    // to handle versioning (v12345/) and folder depths correctly.
    const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
};

export { cloudinaryV2 as cloudinary };
