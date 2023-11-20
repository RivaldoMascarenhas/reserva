import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "./footer/footerLogin";
import "./form.css";

export default function FormLogin() {
  const { replace } = useRouter();
  const onFinish = async (values: any) => {
    const res = await signIn<"credentials">("credentials", {
      ...values,
      redirect: false,
    });
    if (res?.ok === true) {
      replace("/");
    }
  };

  return (
    <>
      <strong className="titleForm"> Faça login na plataforma </strong>
      <Form
        name="normal_login"
        className="loginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor insira seu email!",
            },
          ]}
        >
          <Input
            type="email"
            autoComplete="true"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Insina seu email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor insira sua senha!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Entrar
          </Button>{" "}
          Ou{" "}
          <Link href={"/register"} className="registerLink">
            Cadastra-se agora!!
          </Link>
        </Form.Item>
      </Form>
      <Footer />
    </>
  );
}
