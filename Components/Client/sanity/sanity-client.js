import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import sanityClient from "@sanity/client";

const options = {
  dataset: "cmx-data",
  projectId: "4llqmfig",
  token:
    "skVhm3VhF0mO6TUkcO4kwRJv3q50N4er8uZt79MdUiDLgu8WNjIA3rhEWZp9IikKtn65Jw3xL8lPY0GlMfgphFVL2ORg2uxKhSCFUo6qv5vFezfM7wpzSAk3FzJErFy4CocRWJzjGCXytBAIs8H8fVsQ9NVDg177zsw3fgSpRbDXdmfRds5V",
  apiVersion: "2022-11-12",
};

const optionsDB = {
  dataset: "production",
  projectId: "7i409vwp",
  token:
    "skW02MZbZ2M3LCfK7GQeeqiaTipn9YrKBNvnAFm7JW2MNwU6BpRsHXjRMcJE8lcTvZ35mEkppBjn2nWJa6tuGD3mk1yIkdyHsFN7st2143ZD1vLaHorYGm9cI86PYrIuxAkCycd8le03Br7Jw73u9oPojhSJZAwytaQ4j5BYbQ21A2gLBaqC",
  useCdn: false,
};

export const client = createClient(options);
export const sanity = createClient(optionsDB);

const builder = imageUrlBuilder(client);
// parameters:
export function urlFor(source) {
  return builder.image(source);
}
