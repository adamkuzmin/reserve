import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Text48, Text36, Text30 } from "../common/text";

const ProjectContentWrapper = styled.div`
  width: 100%;
`;

const ProjectCols = styled.div`
  width: 100%;
  display: flex;

  && > * + * {
    margin-left: 40px;
  }
`;
ProjectCols.RightCol = styled.div`
  width: 31%;
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
  background-size: cover;
  background: url("/renders/17.jpg");
  margin-top: 5.5vw;
  margin-bottom: 5vw;
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

const ProjectContent = () => {
  const lang = useStore((state) => state.lang);

  return (
    <ProjectContentWrapper>
      <StyledSubTitle>
        <Text48>{descr.l1[lang]}</Text48>
      </StyledSubTitle>
      <ProjectCols>
        <ProjectCols.LeftCol>
          <ProjectCols.LeftGap />
          <ProjectCols.Content>
            <StyledText48 data-font="wremena">{descr.l2[lang]}</StyledText48>
          </ProjectCols.Content>
        </ProjectCols.LeftCol>
        <ProjectCols.RightCol />
      </ProjectCols>

      <ProjectCols>
        <ProjectCols.LeftCol>
          <ProjectCols.Content>
            <ProjectCols.LeftCol>
              <ProjectCols.LeftGap />
              <ProjectCols.Content>
                <StyledText36 data-font="ibm">{descr.l3[lang]}</StyledText36>
              </ProjectCols.Content>
            </ProjectCols.LeftCol>

            <StyledSubTitle>
              <Text48>{descr.l4[lang]}</Text48>
            </StyledSubTitle>
            <StyledText36 data-font="ibm">{descr.l5[lang]}</StyledText36>
            <ImageContent />
            <StyledText36 data-font="ibm">{descr.l6[lang]}</StyledText36>
            <ProjectCols.LeftCol>
              <ProjectCols.LeftGap />
              <ProjectCols.Content>
                <StyledText48 data-font="wremena">
                  {descr.l7[lang]}
                </StyledText48>
              </ProjectCols.Content>
            </ProjectCols.LeftCol>
          </ProjectCols.Content>
        </ProjectCols.LeftCol>
        <ProjectCols.RightCol>
          <ProjectCols.Content>
            <ParamBlock>
              <Text30>Типология</Text30>
              <Text30>Не известно</Text30>
            </ParamBlock>
            <ParamBlock>
              <Text30>Статус</Text30>
              <Text30>Не известно</Text30>
            </ParamBlock>
            <ParamBlock>
              <Text30>Место</Text30>
              <Text30>
                г.Москва,ул. Садовническая, вл. 57, стр. 1А, 2, 3, 4, 5, 6, 7, 8
              </Text30>
            </ParamBlock>
            <ParamBlock>
              <Text30>Год</Text30>
              <Text30>2013—2016</Text30>
            </ParamBlock>
            <ParamBlock>
              <Text30>Команда</Text30>
              <Text30>
                Хрустим Похрустам
                <br />
                Вионович Плоткин
                <br />
                Карим Каримский
              </Text30>
            </ParamBlock>
            <ParamBlock>
              <Text30>Подрядчик</Text30>
              <Text30>ООО ПРОСМТРОЙ</Text30>
            </ParamBlock>
            <ParamBlock>
              <Text30>Фотографии</Text30>
              <Text30>Прыовлф Руслан Мулан</Text30>
            </ParamBlock>
            <ParamBlock>
              <Text30>Сотрудничество</Text30>
              <Text30>SPEECH</Text30>
            </ParamBlock>
            <ParamBlock>
              <Text30>Награды</Text30>
              <Text30>
                Диплом Союза Архитекторов России на фестивале "Зодчество 2017",
                номинация "Многофункциональные жилые ансамбли и комплексы",
                победитель номинации; RREF AWARDS 2015 г., номинация "Элитное
                жилье", победитель номинации; Urban Awards 2013 номинация
                «Лучший строящийся жилой комплекс элит-класса Москвы»,
                победитель номинации; RREF AWARDS 2013 г. номинация "Элитное
                жилье", победитель номинации.
              </Text30>
            </ParamBlock>
          </ProjectCols.Content>
        </ProjectCols.RightCol>
      </ProjectCols>
    </ProjectContentWrapper>
  );
};

export default ProjectContent;
