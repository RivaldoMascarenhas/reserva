"use client";
import { valuesProps } from "@/@types/types";
import { api } from "@/_lib/axios";
import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/navigation";

const initialValues: valuesProps = {
  name: "",
  password: "",
  company: "",
  email: "",
  confirmPassword: "",
  agree: true,
};

export function FormRegister() {
  const { replace } = useRouter();

  const onFinish = async (values: valuesProps) => {
    try {
      const res = await api.post("api/users", { ...values });

      if (res.statusText === "Created") {
        replace("/");
      }
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
          label="Nome Completo"
          name={"name"}
          rules={[
            { required: true, message: "Insira seu nome completo" },
            {
              pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ]+ [A-Za-zÀ-ÖØ-öø-ÿ]+$/,
              message: "Por favor, insira seu primeiro e segundo nome!",
            },
          ]}
        >
          <Input placeholder="Insira seu nome completo" autoComplete="on" />
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
          rules={[
            { required: true, message: "Insira sua senha" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                "Senha deve conter letras minúscula, maiúscula e pelo menos um número",
            },
          ]}
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
