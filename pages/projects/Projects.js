import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../../Store/useStore";
import styled from "styled-components";

import dynamic from "next/dynamic";

import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import Footer from "../../Components/Footer/Footer";
import { Content } from "../../Components/common/body";

/*import ProjectsGallery from "../../Components/ProjectsLayout/ProjectsGallery";
import ProjectsTable from "../../Components/ProjectsLayout/ProjectsTable";
import ProjectsMap from "../../Components/ProjectsLayout/ProjectsMap";*/

import FloatFilters from "../../Components/Filters/FloatFilters";

import { projectData } from "../../Components/ProjectsLayout/data/data";
import { useQuery } from "@apollo/client";
import { getProjectsHub } from "../admin/projects";
import client from "@/Components/Client/apollo/apollo-client";
import groq from "groq";
import { projectFields } from "@/Components/Admin/queries/__queries";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { useRouter } from "next/router";

const ProjectsGallery = dynamic(() =>
  import("../../Components/ProjectsLayout/ProjectsGallery")
);
const ProjectsTable = dynamic(() =>
  import("../../Components/ProjectsLayout/ProjectsTable")
);
const ProjectsMap = dynamic(() =>
  import("../../Components/ProjectsLayout/ProjectsMap")
);

export const MainContent = styled(Content)`
  &&& {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 100px;
    overflow-x: hidden;

    @media (max-width: 576px) {
      & {
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 70px;
      }
    }

    min-height: 100vh;

    & {
      transition: all 1s ease-in-out;
    }

    transform: translateY(20px);
    opacity: 0;

    animation: SectionAppear 0.4s cubic-bezier(0.19, 1, 0.22, 1) 0.5s;
    @keyframes SectionAppear {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    animation-fill-mode: forwards;
  }
`;

const FilterBackdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9000;
`;

const Projects = () => {
  const router = useRouter();
  const { query } = router;
  const { await: _await } = query;

  const setAnimatedGallery = useStore(({ setAnimatedGallery: a }) => a);

  /* записи */
  const [isFetched, setFetched] = useState(false);
  const [preData, setPreData] = useState();
  const [stateData, setStateData] = useState();

  const [categories, setCategories] = useState();
  const [years, setYears] = useState();

  const [activeCts, setActiveCts] = useState([]);
  const [activeYrs, setActiveYrs] = useState([]);
  const [search, setSearch] = useState();

  const logId = useStore(({ logId }) => logId);
  useEffect(() => {
    const query = groq`
      *[_type == "projects"] {
        ${projectFields}
      }
      | order(cr desc)
    `;

    sanity
      .fetch(query)
      .then((data) => {
        let categories = [];
        let years = [];

        const _data = data.map((item = {}) => {
          const { name, coverhor, coververt, year, cats = [], _id } = item;

          cats.map((cat) => {
            if (!categories.includes(cat)) {
              categories.push(cat);
            }
          });

          if (!years.includes(year)) {
            years.push(year);
          }

          return {
            nameru: name,
            nameen: name,
            coververt,
            coverhor,
            lat: 55.695804,
            lng: 37.485664,
            built: 1,
            current: 0,
            finished: year,
            competition: 0,
            residential: 1,
            id: _id,
            cats,
            year,
          };
        });

        setPreData(_data);
        setCategories(categories);

        if (!_await) {
          setActiveCts(categories);
        } else {
          setActiveCts([_await]);
          setAnimatedGallery(false);
        }

        years = [...years].sort().reverse();
        setYears(years);
        setActiveYrs(years);

        setFetched(true);
      })
      .catch(console.error);
  }, [logId, _await]);

  console.log("activeCts", activeCts);

  useEffect(() => {
    if (preData && activeCts && activeYrs) {
      setStateData(
        [...preData].filter((item = {}) => {
          const { cats = [], year, nameru: name } = item;

          let isCts = false;
          cats.map((cat) => {
            if (activeCts.includes(cat)) isCts = true;
          });

          if (cats.length === 0 && activeCts.length === categories.length) {
            isCts = true;
          }

          let isYrs = false;
          if (activeYrs.includes(year)) isYrs = true;

          let isSrch = true;
          if (!(!search || search === "" || !name)) {
            if (name.toLowerCase().includes(search.toLowerCase())) {
              isSrch = true;
            } else {
              isSrch = false;
            }
          }

          if (isCts && isYrs && isSrch) return true;
        })
      );
    }
  }, [preData, categories, years, activeCts, activeYrs, search]);

  /**
   * States для анимации галереи
   */

  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const [LayoutType, setLayoutType] = useState(1);
  const [FilterType, setFilterType] = useState(null);

  const toPageTop = () => {
    window.scrollTo(0, 0);
  };

  /**
   * Скролл
   */
  const maincontentRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      if (maincontentRef && maincontentRef.current) {
        const maincontent = maincontentRef.current.getBoundingClientRect();

        if (maincontent.top <= 0 && maincontent.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  useEffect(() => {
    setBlackLogo(true);
  }, []);

  /**
   * Разделы
   */

  let LayoutBlock;

  switch (LayoutType) {
    case 0:
      LayoutBlock = <ProjectsTable {...{ stateData }} />;
      break;
    case 1:
      LayoutBlock = <ProjectsGallery {...{ stateData }} />;
      break;
    case 2:
      LayoutBlock = <ProjectsMap {...{ stateData }} />;
      break;
  }

  if (!(stateData && isFetched)) return <></>;

  return (
    <div>
      <NavRight />
      <Navigation />

      {FilterType && <FilterBackdrop onClick={() => setFilterType(null)} />}

      {categories && years && (
        <FloatFilters
          {...{
            //разделы
            setLayoutType,
            LayoutType,
            //Фильтры
            FilterType,
            setFilterType,
            //Дополнительное
            toPageTop,
            //работа с записями
            stateData,
            setStateData: () => {},
            categories,
            years,
            /* */
            activeCts,
            activeYrs,
            setActiveCts,
            setActiveYrs,
            search,
            setSearch,
            /* */
          }}
        />
      )}
      <MainContent key={`contentType:${LayoutType}`} ref={maincontentRef}>
        {LayoutBlock}
      </MainContent>

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
};

export default Projects;
