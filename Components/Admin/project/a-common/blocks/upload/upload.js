import { v4 as uuidv4 } from "uuid";
import { client } from "@/Components/Client/sanity/sanity-client";
import pica from "pica";

function base64ToBlob(base64, mimeType) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

const handleImageUpload = async (imgBase64, onFinish = () => {}) => {
  try {
    const mimeType = imgBase64.startsWith("data:image/png")
      ? "image/png"
      : "image/jpeg";
    const base64Data = imgBase64.split(",")[1];
    const imgBlob = base64ToBlob(base64Data, mimeType);

    const img = new Image();
    img.src = URL.createObjectURL(imgBlob);

    img.addEventListener("load", async () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const p = pica();
      p.resize(img, canvas).then(async () => {
        const thumbnail_image = await new Promise((resolve) =>
          canvas.toBlob((blob) => resolve(blob), "image/jpeg", 1)
        );

        const fileReader = new FileReader();
        fileReader.onload = async () => {
          const imageBuffer = new Uint8Array(fileReader.result);

          const asset = await client.assets.upload("image", imageBuffer, {
            filename: `preview-${uuidv4()}`,
            contentType: "image/jpeg",
          });
          const { url } = asset;
          onFinish(url);
        };
        fileReader.readAsArrayBuffer(thumbnail_image);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export default handleImageUpload;
