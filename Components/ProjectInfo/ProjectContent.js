import styled from "styled-components";

import {
  Text254,
  Text96,
  Text60,
  Text48,
  Text40,
  Text36,
  Text30,
  Text24,
} from "../common/text";

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
  font-weight: 400
`

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
  color: #6E6E6E;

  && span:nth-child(1) {
    font-weight: 600;
    margin-bottom: 10px
  }
`;

const ProjectContent = () => {
  return (
    <ProjectContentWrapper>
      <StyledSubTitle>
        <Text48>Двор Is more</Text48>
      </StyledSubTitle>
      <ProjectCols>
        <ProjectCols.LeftCol>
          <ProjectCols.LeftGap />
          <ProjectCols.Content>
            <StyledText48 data-font="wremena">
              Двор — это нечто большее, чем просто пространство каре. Двор — это
              смысл, глубина и суть русской души. Мы работали над двором, чтобы
              сделать его больше, то есть more.
            </StyledText48>
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
                <StyledText36 data-font="ibm">
                  Здание имеет в плане форму «каре». Внутренняя территория имеет
                  два уровня, то есть часть здания установлена на стилобате.
                  Объемно-пространственное решение здания представляет собой
                  3-7-этажный объем с возрастанием этажности в сторону
                  набережной, и имеющий в плане форму «каре». Главная задача
                  проекта — создание стилистически единого комплекса, состоящего
                  из 11 жилых секций, объединенных общим стилобатом.
                  Периметрально расположенное здание образует общий внутренний
                  двор комплекса, в который обращены все главные входы в жилые
                  секции.
                </StyledText36>
              </ProjectCols.Content>
            </ProjectCols.LeftCol>

            <StyledSubTitle>
              <Text48>Двор создает вовлеченную изолированность</Text48>
            </StyledSubTitle>
            <StyledText36 data-font="ibm">
              Расположение помещений, их взаимосвязь, рациональное использование
              полезных площадей создает комфортное условие для проживания
              жильцов. Стилобатная часть имеет полноценное благоустройство и
              озеленение (конструкция кровли стилобата предусматривает
              возможность посадки деревьев и кустарников).
            </StyledText36>
            <ImageContent />
            <StyledText36 data-font="ibm">Владимир Плоткин:</StyledText36>
            <ProjectCols.LeftCol>
              <ProjectCols.LeftGap />
              <ProjectCols.Content>
                <StyledText48 data-font="wremena">
                  «В жилом комплексе Wine House центральным является
                  взаимодействие архитектуры исторического корпуса, связанного
                  стилистически с застройкой Замоскворечья, и новых жилых
                  блоков. Мы внимательно подошли к соблюдению высотности,
                  поддержке карнизных линий зданий, прилегающих к кварталу.
                  Очень хорошо работает террасное решение корпусов с понижением
                  к красной линии. Расположение объекта в исторической части
                  города предопределило выбор натурального камня для отделки
                  фасадов».
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
