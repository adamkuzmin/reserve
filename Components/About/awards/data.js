const intro = {
  title: {
    ru: <>Награды в профессиональных смотрах</>,
    en: <>Awards in professional reviews</>,
  },
  descr: {
    ru: (
      <>
        Мы внимательно оцениваем особенности типологии будущего объекта,
        учитывая изменения, которые вносят в эту типологию требования непрерывно
        меняющегося общества.
      </>
    ),
    en: (
      <>
        We carefully assess the specifics of the typology of the future site,
        taking into account the changes that the demands of an ever-changing
        society bring to this typology.
      </>
    ),
  },
};

/* Data List */
const data2019 = [
  {
    photo: "/about/awards/1.jpg",
    items: [
      {
        index: 1,
        name: {
          ru: <>Больница с родильным домом в пос. Коммунарка</>,
          en: <>Hospital with maternity hospital in Kommunarka</>,
        },
        label: {
          ru: (
            <>
              Победитель в номинации «Лучшее архитектурно-градостроительное
              решение объекта образования и медицины».
            </>
          ),
          en: (
            <>
              Winner in the category "Best architectural and urban planning
              solution for an educational and medical facility".
            </>
          ),
        },
      },
    ],
  },

  {
    photo: "/about/awards/2.jpg",
    items: [
      {
        index: 3,
        name: {
          ru: <>Концертный зал «Зарядье»</>,
          en: <>Zaryadye Concert Hall</>,
        },
        label: {
          ru: <>Финалист в номинации «Культура – построенные объекты».</>,
          en: <>Finalist in the Culture - Constructed Sites category.</>,
        },
      },
      {
        index: 1,
        name: {
          ru: <>Больница с родильным домом в пос. Коммунарка</>,
          en: <>Hospital with maternity hospital in Kommunarka</>,
        },
        label: {
          ru: <>Финалист в номинации «Медицина – проекты»</>,
          en: <>Finalist in the Medicine - Projects category</>,
        },
      },
    ],
  },

  {
    photo: "/about/awards/3.jpg",
    items: [
      {
        index: 3,
        name: {
          ru: <>Концертный зал «Зарядье»</>,
          en: <>Zaryadye Concert Hall</>,
        },
        label: {
          ru: <>Специальный Приз жюри MIPIM 2019 (Канны, Франция)</>,
          en: <>Special Jury Prize MIPIM 2019 (Cannes, France)</>,
        },
      },
    ],
  },

  {
    photo: "/about/awards/4.jpg",
    items: [
      {
        index: 3,
        name: {
          ru: <>Концертный зал «Зарядье»</>,
          en: <>Zaryadye Concert Hall</>,
        },
        label: {
          ru: <>Финалист в номинации «Культура – построенные объекты».</>,
          en: <>Finalist in the Culture - Constructed Sites category.</>,
        },
      },
    ],
  },
];

const data2018 = [
  {
    photo: "/about/awards/5.jpg",
    items: [
      {
        index: 0,
        name: {
          ru: <>Комплекс апартаментов STORY, Москва, Автозаводский пр. 13</>,
          en: <>Apartment complex STORY, Avtozavodskiy Ave. 13</>,
        },
        label: {
          ru: <>Победитель номинации: "АРХИТЕКТУРА / АПАРТАМЕНТЫ"</>,
          en: <>Winner of the nomination: "ARCHITECTURE / APARTMENTS</>,
        },
      },
    ],
  },
];

const data2017 = [
  {
    photo: "/about/awards/6.jpg",
    items: [
      {
        index: 8,
        name: {
          ru: <>Жилой комплекс Wine House</>,
          en: <>Wine House residential complex</>,
        },
        label: {
          ru: (
            <>
              Диплом Союза Архитекторов России в номинации «Многофункциональные
              градостроительные ансамбли и комплексы», раздел «Постройки»
            </>
          ),
          en: (
            <>
              Diploma of the Union of Architects of Russia in the category
              "Multifunctional urban planning ensembles and complexes", section
              "Buildings
            </>
          ),
        },
      },
    ],
  },

  {
    photo: "/about/awards/7.png",
    items: [
      {
        index: 22,
        name: {
          ru: <>Китайский деловой центр «Парк Хуамин»</>,
          en: <>Huaming Park Chinese Business Centre</>,
        },
        label: {
          ru: (
            <>
              Победитель в номинации “Технологии информационного моделирования в
              проектировании недвижимости (BIM проект)”
            </>
          ),
          en: (
            <>
              Winner in the category "Information Modelling Technologies in Real
              Estate Design (BIM project)
            </>
          ),
        },
      },
    ],
  },
];

const awardsData = [
  {
    year: "2019",
    list: data2019,
  },
  {
    year: "2018",
    list: data2018,
  },
  {
    year: "2017",
    list: data2017,
  },
];

export { intro, awardsData };
