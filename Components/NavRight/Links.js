import { Text48, Text30 } from "../common/text";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "../../Store/useStore";

import { Tooltip } from "antd";
import { NavLink } from "./styles";

/* данные по ссылкам */
import { pagesConfigs } from "../../Store/pagesConfigs";

const LeadLinks = ({ routes }) => {
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
          <Text48>
            <Link href={route}>
              <a>{lang === "ru" ? title : entitle}</a>
            </Link>
          </Text48>
        </NavLink>
      );
    });
  }
};

const SecondaryLinks = ({ routes }) => {
  const router = useRouter();
  const { pathname } = router;

  if (routes) {
    return routes.map((route, i) => {
      const data = pagesConfigs[route];
      const { type, title, entitle } = data;

      const lang = useStore((state) => state.lang);

      return (
        <NavLink data-active={pathname === route ? "active" : "noactive"}>
          <Text30>
            <Link href={route}>
              <a data-font="ibm">{lang === "ru" ? title : entitle}</a>
            </Link>
          </Text30>
        </NavLink>
      );
    });
  }
};

export { LeadLinks, SecondaryLinks };
