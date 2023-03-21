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

export const categoriesFields = groq`
    _id,
    name,
    cr
`;

export const projectFields_mini = groq`
    _id,
    cr
`;

export const catsFields = groq`
    _id,
    name,
    cr
`;

export const HomeQuery = groq`
    *[_type == "home" ] {
        _id,
        block1,
        block2_numbers[],
        block2_labels[],
        block3_1,
        block3_2,
        block3_3,
        block4_1,
        block5_1,
        block5_2,
        block6_1
    }
`;
