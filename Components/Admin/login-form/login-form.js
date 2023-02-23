import { Wrap30 } from "@/Components/common/text";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/router";
import { AntForm } from "./__styles";

const LoginForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleLogin = async (values) => {
    try {
      const response = await fetch("/api/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        message.success(`Welcome ${data.username}!`);
        location.reload();
      } else {
        message.error("Invalid username or password");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
      data-type="wrapper"
    >
      <div style={{ width: "100%", maxWidth: "600px", marginTop: "120px" }}>
        <div style={{ width: "100%" }}>
          <AntForm form={form} onFinish={handleLogin}>
            <Wrap30>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please enter your username" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
            </Wrap30>

            <Wrap30>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Wrap30>

            <Wrap30>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Wrap30>
          </AntForm>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
