import groq from "groq";

export const projectFields = groq`
    _id,
    name,
    description,
    lng,
    lat,
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

export const PartnersQuery = groq`
    *[_type == "partners" ] {
      _id,
      name,
      location,
      review,
      cr,
    }
    | order(cr desc)
`;

export const AboutQuery = groq`
    *[_type == "about" ] {
        _id,
        block1,
        block2,
        block3_title,
        block3_label,
        block3_content,
        block3_url,
        block4_title,
        block4_content,
        block5_content,
        block6[],
        slider[]
    }
`;

export const AwardsQuery = groq`
  *[_type == "awards"] | order(year desc) {
    _id,
    year,
    cover,
    cr,
    awards_refs[]{
      cover,
      project->{
        name
      }
    }
  }
`;

export const AwardQuery = groq`
  *[ _type == "awards" && _id == $id ] {
    _id,
    cover,
    year,
    cr,
    awards_refs[]
  }[0]
`;

export const AwardsRefQuery = groq`
  *[_type == "awards_ref"] {
    _id,
    cover,
    project->{
      _id,
      name,
      coverhor,
      coververt
    }
  }
`;

export const MemberQuery = groq`
  *[_type == 'team_members' && _id == $id][0] {
    _id,
    name,
    url,
    label
  }
`;

export const TeamQuery = groq`
  {
    "members": *[_type == 'team_categories'] {
      _id,
      name,
      order,
      "members": *[_type == 'team_members' && references(^._id)] {
        _id,
        name,
        url,
        label
      }
    },
    "team": *[_type == "team"][0] {
      _id,
      block1_content,
      block1_label,
      block1_int,
      block2_title,
      block2_content,
      block2_name,
      block2_label,
      block2_url,
      slider
    }
  }
`;
