import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const options = {
  dataset: "cmx-data",
  projectId: "4llqmfig",
  token:
    "skVhm3VhF0mO6TUkcO4kwRJv3q50N4er8uZt79MdUiDLgu8WNjIA3rhEWZp9IikKtn65Jw3xL8lPY0GlMfgphFVL2ORg2uxKhSCFUo6qv5vFezfM7wpzSAk3FzJErFy4CocRWJzjGCXytBAIs8H8fVsQ9NVDg177zsw3fgSpRbDXdmfRds5V",
  apiVersion: "2022-11-12",
};

export const client = createClient(options);

const builder = imageUrlBuilder(client);
// parameters:
export function urlFor(source) {
  return builder.image(source);
}
