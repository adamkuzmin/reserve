import { Text24 } from "../../../common/text";
import { Filters, FilterWrapper, FLink } from "../../../Filters/styles";

const Nav = ({ section, setSection }) => {
  const nav = [
    { name: "Общие сведения", value: "common" },
    { name: "Редактор контента", value: "editor" },
  ];

  return (
    <>
      <FilterWrapper>
        <Filters>
          {nav &&
            nav.map((item, i) => {
              return (
                <FLink
                  onClick={() => {
                    setSection(item.value);
                  }}
                  data-type={section === item.value && "link"}
                >
                  <Text24>{item.name}</Text24>
                </FLink>
              );
            })}
        </Filters>
      </FilterWrapper>
    </>
  );
};

export default Nav;
