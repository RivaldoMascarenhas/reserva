import { Button, Checkbox, Form, Input } from "antd";
import { Dispatch, SetStateAction } from "react";
import "./form.css";

interface FormRegisterProps {
  setRegister: Dispatch<SetStateAction<boolean>>;
}

export function FormRegister({ setRegister }: FormRegisterProps) {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <strong> Cadastre-se agora </strong>
      <Form name="register-form" onFinish={onFinish}>
        <Form.Item
          label="Empresa"
          name={"company"}
          rules={[{ message: "Insira nome de sua Empresa" }]}
        >
          <Input placeholder="Insira nome de sua Empresa" autoFocus />
        </Form.Item>
        <Form.Item
          label="Nome"
          name={"UserName"}
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

        <Form.Item name="agree" valuePropName="checked">
          <Checkbox defaultChecked>
            Eu aceito <a> os termos de uso</a> da plataforma
          </Checkbox>
        </Form.Item>
        <Button type="primary" htmlType="submit" block onClick={() => onFinish}>
          CADASTRAR
        </Button>
        <p>
          Já possui uma conta? Faça{" "}
          <a
            onClick={() => {
              setRegister((state) => !state);
            }}
          >
            login.
          </a>
        </p>
      </Form>
    </>
  );
}
