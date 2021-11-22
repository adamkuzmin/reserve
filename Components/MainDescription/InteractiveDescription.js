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

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InteractiveCanvas = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 672px;
  height: 778px;
  background: url("/icons/geometryBase.svg");
  background-size: cover;
`;

const Lead = styled.div`
  margin-top: 10vw;
  margin-bottom: 19.6vw;
  line-height: 1.06;
  width: 59.3vw;
  margin-left: 11.4vw;
`;

const InteractiveDescription = () => {
  return (
    <Wrapper>
      <InteractiveCanvas />
      <Lead data-font="wremena">
        <Text60>
          Резерв — это бюро, которое создает решения, определяющие
          и&nbsp;меняющие мировую моду в&nbsp;архитектуре и&nbsp;способные
          создавать эмоции в&nbsp;душах даже самых черствых людей.
        </Text60>
      </Lead>
    </Wrapper>
  );
};

export default InteractiveDescription;
