import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Footer } from "./footer/footerLogin";
import "./form.css";

export default function FormLogin() {
  const { replace } = useRouter();
  const [messageError, setMessageError] = useState({ type: "", message: "" });

  const onFinish = async (values: any) => {
    try {
      const res = await signIn<"credentials">("credentials", {
        ...values,
        redirect: false,
      });
      if (res?.error) {
        if (res.error.includes("Email")) {
          setMessageError({ type: "email", message: res.error });
        } else {
          setMessageError({ type: "password", message: res.error });
        }
      }
      if (res?.ok === true) {
        replace("/");
      }
    } catch (error) {
      console.error("Error na requisição", error);
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
          help={messageError.type === "email" ? messageError.message : ""}
          rules={[
            {
              required: true,
              message: "Por favor insira seu email!",
            },
          ]}
        >
          <Input
            type="email"
            autoComplete="on"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Insina seu email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          help={messageError.type === "password" ? messageError.message : ""}
          rules={[
            { required: true, message: "Insira sua senha" },
            // {
            //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            //   message:
            //     "Senha deve conter letras minúscula, maiúscula e pelo menos um número",
            // },
          ]}
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
