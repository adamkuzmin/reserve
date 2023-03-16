import { client } from "../../../Components/Client/sanity/sanity-client";
import { v4 as uuidv4 } from "uuid";
import getRawBody from "raw-body";

const Jimp = require("jimp");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const requestBody = await getRawBody(req, {
          limit: "5mb",
          encoding: "utf-8",
        });

        const { id, thumbnail_img } = JSON.parse(requestBody);

        let data = {};

        const imageBuffer = Buffer.from(
          thumbnail_img.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        const image = await Jimp.read(imageBuffer);
        const thumbnail_image = await image
          .quality(100)
          .getBufferAsync(Jimp.MIME_JPEG);

        await client.assets
          .upload("image", thumbnail_image, {
            filename: `preview-${uuidv4()}-${id}`,
            contentType: "image/jpeg",
          })
          .then((imageAsset) => {
            const { url } = imageAsset;

            res.status(200).json({ data, url, msg: "edited" });
          })
          .catch((e) => {});
      } catch (err) {
        res
          .status(500)
          .send({ message: "Failed to update scene preview", error: err });
      }

      break;
  }
}
