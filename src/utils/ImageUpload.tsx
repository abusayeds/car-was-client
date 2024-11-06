// src/utils/imageUpload.ts
export const imgBbKey = "92d252bf68d6b31fef4e36b725cf9979";
import axios from "axios";

/**
 * Uploads an image file to imgbb and returns the URL.
 * @param image - The image file to upload.
 * @param apiKey - Your imgbb API key.
 * @returns Promise<string> - The URL of the uploaded image.
 */
export const uploadImageToImgBB = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=92d252bf68d6b31fef4e36b725cf9979`,
      formData
    );
    return response?.data?.data?.url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Image upload failed");
  }
};
