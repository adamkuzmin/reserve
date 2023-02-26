import { Form, Input } from "antd";
import { Col4 } from "./__styled";
const { useForm } = Form;

const Items4 = ({ value = [], onChange = () => {} }) => {
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
                <Form.Item key={`f:${i}`} name={`${i}`}>
                  <Input />
                </Form.Item>
              );
            })}
        </Col4>
      </Form>
    </>
  );
};

export default Items4;
