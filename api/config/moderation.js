import vision from "@google-cloud/vision";
import dotenv from "dotenv";
dotenv.config();

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

async function moderateImage(imageURL) {
  try {
    const [result] = await client.safeSearchDetection(imageURL);
    const detections = result.safeSearchAnnotation;

    if (
      detections.adult === "LIKELY" ||
      detections.adult === "VERY_LIKELY" ||
      detections.racy === "LIKELY" ||
      detections.racy === "VERY_LIKELY" ||
      detections.violence === "LIKELY" ||
      detections.violence === "VERY_LIKELY"
    ) {
      return { allowed: false, reason: "Inappropriate content detected." };
    }
    return { allowed: true };
  } catch (error) {
    console.error("Error analyzing image:", error);
    return { allowed: false, reason: "Error processing image." };
  }
}

export default moderateImage;




