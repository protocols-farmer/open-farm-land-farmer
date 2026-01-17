// client/src/components/shared/cropImage.ts
import type { Area } from "react-easy-crop";

export default function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("No canvas context");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      const base64Image = canvas.toDataURL("image/jpeg", 0.9);
      image.src = "";
      canvas.width = 0;
      canvas.height = 0;

      resolve(base64Image);
    };

    image.onerror = (err) => {
      image.src = "";
      reject(err);
    };
  });
}
