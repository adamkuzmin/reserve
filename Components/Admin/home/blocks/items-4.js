import { Wrap30 } from "@/Components/common/text";
import { Form, Input } from "antd";
import { Col4 } from "./__styled";
const { useForm } = Form;

const TextWrapper = ({ isWrapped = false, children }) => {
  return isWrapped ? <Wrap30>{children}</Wrap30> : <>{children}</>;
};

const Items4 = ({ value = [], onChange = () => {}, textarea, wrap30 }) => {
  return (
    <>
      <Form
        onValuesChange={(e, b) => {
          let arr = [];
          Object.keys(b).map((val) => arr.push(b[val]));

          onChange(arr);
        }}
        initialValues={((value) => {
          let obj = {};

          value.map((item, i) => {
            obj[`${i}`] = item;
          });

          return obj;
        })(value)}
      >
        <Col4>
          {Array(4)
            .fill(1)
            .map((_, i) => {
              return (
                <TextWrapper isWrapped={wrap30}>
                  <Form.Item key={`f:${i}`} name={`${i}`}>
                    {textarea ? <Input.TextArea rows={2} /> : <Input />}
                  </Form.Item>
                </TextWrapper>
              );
            })}
        </Col4>
      </Form>
    </>
  );
};

export default Items4;
