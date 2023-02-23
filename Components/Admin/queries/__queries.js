import groq from "groq";

export const projectFields = groq`
    _id,
    name,
    description,
    cr,
    address,
    city,
    coverhor,
    coververt,
    comment,
    cats[],
    main_img,
    meta,
    secondary_imgs[],
    slider_imgs[],
    year,
    index
`;

export const catsFields = groq`
    _id,
    name,
    cr
`;
