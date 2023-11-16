"use client";
import { valuesProps } from "@/@types/types";
import { api } from "@/lib/axios";
import { Button, Checkbox, Form, Input } from "antd";

const initialValues: valuesProps = {
  name: "",
  password: "",
  company: "",
  email: "",
  confirmPassword: "",
  agree: true,
};

export function FormRegister() {
  const onFinish = async (values: valuesProps) => {
    try {
      await api.post("/users", {
        name: values.name,
        email: values.email,
        password: values.password,
        agree: values.agree,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <strong style={{ marginBottom: "1rem" }}> Cadastre-se agora </strong>
      <Form
        name="register-form"
        className="loginForm"
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Empresa"
          name={"company"}
          rules={[{ message: "Insira nome de sua Empresa" }]}
        >
          <Input placeholder="Insira nome de sua Empresa" autoFocus />
        </Form.Item>
        <Form.Item
          label="Nome"
          name={"name"}
          rules={[{ required: true, message: "Insira seu nome" }]}
        >
          <Input placeholder="Insira seu nome" autoComplete="on" />
        </Form.Item>
        <Form.Item
          label="Email"
          name={"email"}
          rules={[{ required: true, message: "Insira seu e-mail" }]}
        >
          <Input
            type="email"
            placeholder="Insira seu e-mail"
            autoComplete="on"
          />
        </Form.Item>
        <Form.Item
          label="Senha"
          name={"password"}
          rules={[{ required: true, message: "Insira sua senha" }]}
        >
          <Input type="password" placeholder="************" />
        </Form.Item>
        <Form.Item
          label="Confirmar Senha"
          name={"confirmPassword"}
          rules={[
            {
              required: true,
              message: "Por favor, confirme sua senha",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("A senha não confere!"));
              },
            }),
          ]}
        >
          <Input type="password" placeholder="************" />
        </Form.Item>

        <Form.Item required name="agree" valuePropName="checked">
          <Checkbox defaultChecked>
            Eu aceito <a>termos.</a>
          </Checkbox>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          CADASTRAR
        </Button>
        <p>
          Já possui uma conta? Faça <a href="/">login.</a>
        </p>
      </Form>
    </>
  );
}
