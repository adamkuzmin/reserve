import { Text96, Text60, Text48, Text30 } from "../common/text";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "../../Store/useStore";

import { Tooltip, Grid } from "antd";
import { NavLink } from "./styles";

const { useBreakpoint } = Grid;

/* данные по ссылкам */
import { pagesConfigs } from "../../Store/pagesConfigs";

const LeadLinks = ({ routes }) => {
  const screens = useBreakpoint();

  const router = useRouter();
  const { pathname } = router;

  const lang = useStore((state) => state.lang);

  if (routes) {
    return routes.map((route, i) => {
      const data = pagesConfigs[route];
      const { type, title, entitle } = data;

      return (
        <NavLink
          key={`nav:${type}:${i}`}
          data-active={pathname === route ? "active" : "noactive"}
        >
          {screens.sm ? (
            <Text48>
              <Link href={route}>{lang === "ru" ? title : entitle}</Link>
            </Text48>
          ) : (
            <Text96 data-type="navright">
              <Link href={route}>{lang === "ru" ? title : entitle}</Link>
            </Text96>
          )}
        </NavLink>
      );
    });
  }
};

const SecondaryLinks = ({ routes }) => {
  const screens = useBreakpoint();

  const router = useRouter();
  const { pathname } = router;

  if (routes) {
    return routes.map((route, i) => {
      const data = pagesConfigs[route];
      const { type, title, entitle } = data;

      const lang = useStore((state) => state.lang);

      return (
        <NavLink data-active={pathname === route ? "active" : "noactive"}>
          {screens.sm ? (
            <Text30>
              <Link href={route}>
                <span data-font="ibm">{lang === "ru" ? title : entitle}</span>
              </Link>
            </Text30>
          ) : (
            <Text60 data-type="nav-secondary">
              <Link href={route}>
                <span data-font="ibm">{lang === "ru" ? title : entitle}</span>
              </Link>
            </Text60>
          )}
        </NavLink>
      );
    });
  }
};

export { LeadLinks, SecondaryLinks };
