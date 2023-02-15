import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import cookie from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

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

        cookie.set("username", data.username /* , { sameSite: "strict" } */);
        location.reload();
      } else {
        message.error("Invalid username or password");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <h1>Login Page</h1>
      <Form form={form} onFinish={handleLogin}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
