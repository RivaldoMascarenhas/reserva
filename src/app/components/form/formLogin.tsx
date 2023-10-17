import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./form.css";
import { Dispatch, SetStateAction } from "react";

interface FormLoginProps {
  setRegister: Dispatch<SetStateAction<boolean>>;
}

export function FormLogin({ setRegister }: FormLoginProps) {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Por favor insira seu nome de usuário!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Insina seu nome de usuário"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Por favor insira sua senha!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Insira sua senha!"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Manter-me conectado</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Recuperar senha
        </a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Entrar
        </Button>{" "}
        Ou{" "}
        <i
          onClick={() => setRegister((state) => !state)}
          className="registerLink"
        >
          Cadastra-se agora!!
        </i>
      </Form.Item>
    </Form>
  );
}
