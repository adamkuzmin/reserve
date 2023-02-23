import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Text48, Text36, Text30 } from "../common/text";
import { Grid } from "antd";
import QuillEditor from "../Admin/project/b-editor/blocks/quill";

const { useBreakpoint } = Grid;

const ProjectContentWrapper = styled.div`
  width: 100%;
`;

export const ProjectCols = styled.div`
  width: 100%;
  display: flex;

  && > * + * {
    margin-left: 40px;
  }

  @media (max-width: 776px) {
    flex-direction: column;

    && > * + * {
      margin-left: 0px;
    }
  }
`;
ProjectCols.RightCol = styled.div`
  width: 31%;

  @media (max-width: 776px) {
    width: 80%;
    margin-bottom: 24px;
  }
`;

ProjectCols.LeftCol = styled.div`
  width: 100%;
  display: flex;
`;

ProjectCols.LeftGap = styled.div`
  width: 20%;
`;

ProjectCols.Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledSubTitle = styled.div`
  font-weight: 600;
  max-width: 70%;
  line-height: 1.14;
  margin-top: 5.8vw;
  margin-bottom: 2.2vw;
`;

const StyledText36 = styled(Text36)`
  line-height: 1.3;
  font-weight: 400;
`;

const StyledText48 = styled(Text48)`
  line-height: 1.1;
  padding-bottom: 5.2vw;
  padding-top: 3.8vw;
`;

const ImageContent = styled.div`
  width: 47vw;
  height: 33vw;
  margin-left: auto;
  margin-right: auto;

  background: url("/renders/17.jpg");
  background-size: cover;
  margin-top: 5.5vw;
  margin-bottom: 5vw;

  @media (max-width: 576px) {
    width: 100%;
    padding-top: 40%;
  }
`;

const ParamBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.1vw;
  line-height: 1.33;
  color: #6e6e6e;

  && span:nth-child(1) {
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const descr = {
  l1: {
    ru: <>Двор Is more</>,
    en: <>Yard Is more</>,
  },

  l2: {
    ru: (
      <>
        Двор — это нечто большее, чем просто пространство каре. Двор — это
        смысл, глубина и суть русской души. Мы работали над двором, чтобы
        сделать его больше, то есть more.
      </>
    ),
    en: (
      <>
        A courtyard is more than just a carriage house. The yard is the meaning,
        the depth and the essence of the Russian soul. We've been working on the
        courtyard to to make it bigger, that is, more.
      </>
    ),
  },

  l3: {
    ru: (
      <>
        Здание имеет в плане форму «каре». Внутренняя территория имеет два
        уровня, то есть часть здания установлена на стилобате.
        Объемно-пространственное решение здания представляет собой 3-7-этажный
        объем с возрастанием этажности в сторону набережной, и имеющий в плане
        форму «каре». Главная задача проекта — создание стилистически единого
        комплекса, состоящего из 11 жилых секций, объединенных общим стилобатом.
        Периметрально расположенное здание образует общий внутренний двор
        комплекса, в который обращены все главные входы в жилые секции.
      </>
    ),
    en: (
      <>
        The building is in the shape of a "square". The interior area has The
        building has two levels, i.e. part of the building is set on a
        stylobate. The spatial design of the building consists of 3-7-storey
        volume with increasing number of floors Quay, and having a form of
        "square" in the plan. The main objective The project is to create a
        stylistically unified complex consisting of 11 residential sections
        united by a square-shaped building. of 11 residential sections united by
        a common stylobate. The perimeter building forms a common inner
        courtyard Perimeterally arranged building forms a common inner yard of
        the complex, to which all the main entrances to the dwelling units turn
        residential units.
      </>
    ),
  },

  l4: {
    ru: <>Двор создает вовлеченную изолированность</>,
    en: <>The courtyard creates an involved insularity</>,
  },

  l5: {
    ru: (
      <>
        Расположение помещений, их взаимосвязь, рациональное использование
        полезных площадей создает комфортное условие для проживания жильцов.
        Стилобатная часть имеет полноценное благоустройство и озеленение
        (конструкция кровли стилобата предусматривает возможность посадки
        деревьев и кустарников).
      </>
    ),
    en: (
      <>
        The arrangement of the rooms, their interconnection, and the rational
        use of usable space create a comfortable living environment for the
        residents. The stylobate has full landscaping and landscaping (the
        design of the roof of the stylobate provides for the planting of trees
        and shrubs).
      </>
    ),
  },

  l6: {
    ru: <>Владимир Плоткин:</>,
    en: <>Vladimir Plotkin:</>,
  },

  l7: {
    ru: (
      <>
        «В жилом комплексе Wine House центральным является взаимодействие
        архитектуры исторического корпуса, связанного стилистически с застройкой
        Замоскворечья, и новых жилых блоков. Мы внимательно подошли к соблюдению
        высотности, поддержке карнизных линий зданий, прилегающих к кварталу.{" "}
        <br />
        <br />
        Очень хорошо работает террасное решение корпусов с понижением к красной
        линии. Расположение объекта в исторической части города предопределило
        выбор натурального камня для отделки фасадов».
      </>
    ),
    en: (
      <>
        "In the Wine House residential complex, the interaction of the
        architecture of the historical building, stylistically linked to the
        Zamoskvorechye development, and the new residential blocks is central.
        We were careful to respect the height, to support the cornice lines of
        the buildings adjacent to the block.
        <br />
        <br />
        The terraced solution of the buildings downslope to the red line works
        very well. The location of the building in the historical part of the
        city predetermined the choice of natural stone for the façades.
      </>
    ),
  },
};

const ProjectContent = ({ initialValues = {} }) => {
  const screens = useBreakpoint();

  const { description, meta } = initialValues;

  const lang = useStore((state) => state.lang);

  return (
    <ProjectContentWrapper>
      <ProjectCols>
        <ProjectCols.LeftCol>
          {description && (
            <QuillEditor
              value={description}
              {...{ isEdit: true }}
              type="description"
            />
          )}
        </ProjectCols.LeftCol>
        <ProjectCols.RightCol>
          {meta && (
            <QuillEditor value={meta} {...{ isEdit: true }} type="meta" />
          )}
        </ProjectCols.RightCol>
      </ProjectCols>
    </ProjectContentWrapper>
  );
};

export default ProjectContent;
