import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const options = {
  dataset: "projects_images",
  projectId: "9qwu66sw",
  token:
    "skIq4Zvtov3QxjBoLSYT3Xxa4hd63fcbBqAetxTwQqE48gYcMaEORtntuowA9CIbCrGZck03tKisu70Jg00Z0QMVj6utFze5h9YkLCK5yyBghuAhqY9mO6pfyWQPAYAid4qqa6nYwMUymwP4dq7D6qKh2DoqPX3qG1dP09xOw6uz5Ov33Vow",
  apiVersion: "2022-11-12",
};

export const client = createClient(options);

const builder = imageUrlBuilder(client);
// parameters:
export function urlFor(source) {
  return builder.image(source);
}
